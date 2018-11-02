

let MoonShardToken = artifacts.require("./MoonShardToken.sol");
let MainnetPreSale = artifacts.require("./MainnetPreSale.sol");

module.exports = async  function(deployer, network, accounts) {

    let token = await MoonShardToken.deployed();
    token.transferOwnership((await MainnetPreSale.deployed()).address);

};