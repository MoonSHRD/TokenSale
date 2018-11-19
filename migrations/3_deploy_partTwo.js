let MoonShardToken = artifacts.require("./MoonShardToken.sol");
let MainnetPreSale = artifacts.require("./MainnetPreSale.sol");
let MainnetPreSalePartTwo = artifacts.require("./MainnetPreSalePartTwo.sol");

module.exports = function (deployer) {

    deployer.deploy(MainnetPreSalePartTwo)
        .then(MainnetPreSalePartTwo.deployed)
};
