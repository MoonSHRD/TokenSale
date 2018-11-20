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
    let revert = 'VM Exception while processing transaction: revert';


    before(async function () {
        Crowdsale = await MainnetPreSale.deployed();
        CrowdsalePartTwo = await MainnetPreSalePartTwo.deployed();
        Token = await MoonShardToken.at(await Crowdsale.token.call());
    });


    describe("Owner", () => {

        it('should not be able to start crowdsale, until conversion rate is not set', async () => {
            await truffleAssert.fails(Crowdsale.start(
                                        {from: owner}), revert);                
        });
        

        it('should grant permissions to updater', async () =>{
            let tx = await Crowdsale.setUpdater(updater,{from:owner});
            assert.ok(tx.logs[0]['event'] == 'UpdaterRoleAssigned')
        });

        it('should be able to pause crowdsale', async () => {
            await Crowdsale.pause({from:owner});
            assert.equal((await Crowdsale.state.call()), 2, "crowdsale was not paused");
        })

        it('should be able to start crowdsale', async () => {
            await Crowdsale.setEtherPrice(10000, {from: updater});
            await Crowdsale.start({from: owner});
            assert.equal((await Crowdsale.state.call()), 1, "crowdsale was not started");
        })

    });

    describe('Price updater', function () {

        it('should be able to set Rate', async () =>{
            const etherRate = 10000;
            await Crowdsale.setEtherPrice(etherRate, {from: updater});
            const rate = await Crowdsale.rate.call();
            //console.log(rate.toNumber())
            assert.strictEqual(rate.toNumber(), 200, "rate was not set");
        });

        it('should be able to set cooldown of rate updating', async () => {
            await Crowdsale.setCooldown(60000, {from: updater});
            const cooldown = await Crowdsale.cooldown.call();
            assert.equal(cooldown, 60000, "cooldown was not set");
        })

    });

    describe('User', function () {

        it('should be able to send ether and recieve tokens', async () =>{ 
           await Crowdsale.sendTransaction({from: wallet,
                                            to: Crowdsale.address, 
                                            value: 100000});
                                        
                               
           const walletTokensAfter = await Token.balanceOf(wallet);
           const contractBalanceAfter = await web3.eth.getBalance(Crowdsale.address);

           assert.equal(walletTokensAfter, 20000000,'tokens were not received by the wallet');
           assert.equal(contractBalanceAfter, 100000,'weiAmount was not received by contract');
        });

        it('should revert transaction when msg.value equal 0', async () => {
           await truffleAssert.fails(Crowdsale.sendTransaction(
                                    {from: wallet, to: Crowdsale.address, value: 0}), revert);           
        })    
    })

    describe('Crowdsale part 1', function () {

        it('should revert transaction when was reached cup of tokens', async () => {
            await truffleAssert.fails(Crowdsale.sendTransaction(
                                    {from: wallet, to: Crowdsale.address, value: 50000 * (10 ** 18)}), revert);
            
        })

        it('should finish crowdsale and grant command of token to CrowdsalePartTwo', async () => {
            let crowdsalePartTwoAddress = await CrowdsalePartTwo.address;
            await Crowdsale.finish(crowdsalePartTwoAddress, {from: owner});

            let tokenOwner = await Token.owner.call();

            assert.equal(tokenOwner, crowdsalePartTwoAddress, "owner of token was not changed") 
        })

        it('should set token for CrowdsalePartTwo', async () => {
            await CrowdsalePartTwo.setToken((await Token.address));
            assert.equal((await CrowdsalePartTwo.token.call()), (await Token.address), "token was not set");
        })
    })
});
