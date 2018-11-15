let MoonShardToken = artifacts.require("./MoonShardToken.sol");
let MainnetPreSale = artifacts.require("./MainnetPreSale.sol");
let MainnetPreSalePartTwo = artifacts.require("./MainnetPreSalePartTwo.sol");

module.exports = function (deployer, network, accounts) {
    let wallet;
    let updater;

    deployer.deploy(MoonShardToken)
        .then(MoonShardToken.deployed)
        .then(token => deployer.deploy(MainnetPreSale, token.address))
        .then(MainnetPreSale.deployed)
};
