const MainnetPreSale = artifacts.require('MainnetPreSale');
const MoonShardToken = artifacts.require('MoonShardToken');
const assert = require("assert");
const revert = require('./helpers/assertRevert');



contract('MainnetPreSale', function (accounts) {
    let Token;
    let Crowdsale;
    let owner = accounts[0];
    let updater = accounts[2];
    let wallet = accounts[1];


    before(async function () {
        Crowdsale = await MainnetPreSale.deployed();
        Token = await MoonShardToken.at(await Crowdsale.token.call());
    });


        describe("Owner", () => {

          /* it("should not be able to start crowdsale, until conversion rate is not set", async () => {
                try {
                    await Crowdsale.start({from: owner})
                    assert.fail();
                } catch (err) {
                    console.log(err.message)
                    assert.ok(/Conversion rate is not set/.test(err.message));
                }
            }); */

            it("should not be able to start crowdsale, until conversion rate is not set", async () => {
                const started = await Crowdsale.start({from: owner});
                assert.ok(started.logs[0]['event'] == 'NotStartedCrowsdale');
            });
            

            it('should grant permissions to updater', async () =>{
                let tx = await Crowdsale.setUpdater(updater,{from:owner});
                assert.ok(tx.logs[0]['event'] == 'UpdaterRoleAssigned')
            });


        describe('accepting payments', function () {
            // it('should accept payments within cap', async function () {
            //     await crowdsale.send(cap.minus(lessThanCap));
            //     await crowdsale.send(lessThanCap);
            // });
            //
            // it('should reject payments outside cap', async function () {
            //     await crowdsale.send(cap);
            //     await expectThrow(
            //         crowdsale.send(1),
            //         EVMRevert,
            //     );
            // });
            //
            // it('should reject payments that exceed cap', async function () {
            //     await expectThrow(
            //         crowdsale.send(cap.plus(1)),
            //         EVMRevert,
            //     );
            // });
        });

    });

    describe('As price updater', function () {

        it('should be able to set Rate', async () =>{
            const etherRate = 100;
            const safeConst = 1000000000000000000;
            const pennyPrice = 50;
            await Crowdsale.setEtherPrice(etherRate, {from: updater});
            const rate = await Crowdsale.rate.call();
            const newRate = rate.toNumber();
            assert.strictEqual(newRate, safeConst / (etherRate * pennyPrice));
        });


    })

    // describe('ending', function () {
    //     it('should not reach cap if sent under cap', async function () {
    //         // await crowdsale.send(lessThanCap);
    //         // const capReached = await crowdsale.capReached();
    //         // capReached.should.equal(false);
    //     });
    //
    //     it('should not reach cap if sent just under cap', async function () {
    //         // await crowdsale.send(cap.minus(1));
    //         // const capReached = await crowdsale.capReached();
    //         // capReached.should.equal(false);
    //     });
    //
    //     it('should reach cap if cap sent', async function () {
    //         // await crowdsale.send(cap);
    //         // const capReached = await crowdsale.capReached();
    //         // capReached.should.equal(true);
    //     });
    // });
});
