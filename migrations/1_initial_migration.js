let Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};


// module.exports = (deployer, network, accounts) => {
//     const userAddress = accounts[3];
//     deployer.deploy(BaconMaker, userAddress)
// }