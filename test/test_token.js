const MainnetPreSale = artifacts.require('MainnetPreSale');
const MoonShardToken = artifacts.require('MoonShardToken');
const assert = require("assert");
const revert = require('./helpers/assertRevert');
const expectEvent = require('./helpers/expectEvent');
const assertRevert = require('./helpers/assertRevert');
const truffleAssert = require('truffle-assertions');



contract('MoonShardToken', function (accounts) {
    let Token;
    let owner = accounts[0];
    let wallet = accounts[1];


    before(async function () {
        Token = await MoonShardToken.new();
    });


        describe("Token", () => {

            it("should mint tokens to account and change TotalSupply", async () => {
                await Token.mint(wallet, 100000, {from: owner});

                const totalSupply = await Token.totalSupply();
                const tokenBalance = await Token.balanceOf(wallet);

                assert.equal(totalSupply, 100000, "totalSupply was not changed");
                assert.equal(tokenBalance, 100000, "tokens were not received by the wallet");                
            });            
        });        
});
