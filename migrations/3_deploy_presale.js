

let MoonShardToken = artifacts.require("./MoonShardToken.sol");
let MainnetPreSale = artifacts.require("./MainnetPreSale.sol");

module.exports = async  function(deployer, network, accounts) {

    switch (network) {
        case 'test':
            wallet = accounts[1];
            updater = accounts[2];
            break;
        default:
            wallet = accounts[1];
            updater = accounts[2];
            break;
    }
    let token = await MoonShardToken.deployed();
    token.transferOwnership((await MainnetPreSale.deployed()).address);
};