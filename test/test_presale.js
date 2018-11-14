const MainnetPreSale = artifacts.require('MainnetPreSale');
const MainnetPreSalePartTwo = artifacts.require('MainnetPreSalePartTwo');
const MoonShardToken = artifacts.require('MoonShardToken');
const assert = require("assert");
const revert = require('./helpers/assertRevert');
const expectEvent = require('./helpers/expectEvent');
const assertRevert = require('./helpers/assertRevert');
const truffleAssert = require('truffle-assertions');



contract('MainnetPreSale', function (accounts) {
    let Token;
    let TokenTwo;
    let Crowdsale;
    let CrowdsalePartTwo;
    let owner = accounts[0];
    let updater = accounts[2];
    let wallet = accounts[1];


    before(async function () {
        Crowdsale = await MainnetPreSale.deployed();
        CrowdsalePartTwo = await MainnetPreSalePartTwo.deployed();
        Token = await MoonShardToken.at(await Crowdsale.token.call());
        //TokenTwo = await MoonShardToken.at(await CrowdsalePartTwo.token.call());
    });


        describe("Owner", () => {

            it('should not be able to start crowdsale, until conversion rate is not set', async () => {
                await truffleAssert.fails(Crowdsale.start(
                                            {from: owner}), 
                                            `VM Exception while processing transaction: revert (conversion rate is not set)`);                
            });
            

            it('should grant permissions to updater', async () =>{
                let tx = await Crowdsale.setUpdater(updater,{from:owner});
                assert.ok(tx.logs[0]['event'] == 'UpdaterRoleAssigned')
            });

    });

    describe('Price updater', function () {

        it('should be able to set Rate', async () =>{
            const etherRate = 100;
            await Crowdsale.setEtherPrice(etherRate, {from: updater});
            const rate = await Crowdsale.rate.call();
            assert.strictEqual(rate.toNumber(), 200000000000000);
        });

        it('should be able to set Rate according to cooldown', async () =>{
            const etherRate = 100;
            await truffleAssert.fails(Crowdsale.setEtherPrice(etherRate, {from: updater}),
                `VM Exception while processing transaction: revert (cooldown since the last update has not yet expired)`);
        });

        it('should be able to set cooldown of rate updating', async () => {
            await Crowdsale.setCooldown(600, {from: updater});
            const cooldown = await Crowdsale.cooldown.call();
            assert.equal(cooldown, 600, "cooldown was not set");
        })

    })

    describe('User', function () {

        it('should be able to send ether and recieve tokens', async () =>{ 
           await Crowdsale.sendTransaction({from: wallet,
                                            to: Crowdsale.address, 
                                            value: 100000});
                                        
                               
           const walletTokensAfter = await Token.balanceOf(wallet);
           const contractBalanceAfter = await web3.eth.getBalance(Crowdsale.address);

           assert.equal(walletTokensAfter, 20000000000000000000,'tokens were not received by the wallet');
           assert.equal(contractBalanceAfter, 100000,'weiAmount was not received by contract');
        });

        it('should be stop transaction when msg.value equal 0', async () => {
           await truffleAssert.fails(Crowdsale.sendTransaction(
                                    {from: wallet, to: Crowdsale.address, value: 0}),
                                    `VM Exception while processing transaction: revert (weiAmount must be more then 0)`);           
        })    
    })

    describe('Crowdsale', function () {

        it('should finish crowdsale and grant command of token to CrowdsalePartTwo', async () =>{
            let crowdsalePartTwoAddress = await CrowdsalePartTwo.address;
            await Crowdsale.finish(crowdsalePartTwoAddress, {from: owner});

            let tokenOwner = await Token.owner.call();

            assert.equal(tokenOwner, crowdsalePartTwoAddress, "owner of token was not changed") 
        })
    })
});
