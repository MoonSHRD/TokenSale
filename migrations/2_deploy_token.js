let MoonShardToken = artifacts.require("./MoonShardToken.sol");
let MainnetPreSale = artifacts.require("./MainnetPreSale.sol");
let MainnetPreSalePartTwo = artifacts.require("./MainnetPreSalePartTwo.sol");

module.exports = async function (deployer, network, accounts) {
    let wallet;
    let updater;

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

    await deployer.deploy(MoonShardToken)
        .then(MoonShardToken.deployed)
        .then(token => deployer.deploy(MainnetPreSale, wallet, updater, token.address))
        .then(MainnetPreSale.deployed)
        .then(token => deployer.deploy(MainnetPreSalePartTwo, wallet, updater, token.address))
        .then(MainnetPreSalePartTwo.deployed);

};
