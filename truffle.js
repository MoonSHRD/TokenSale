
const {readFileSync} = require('fs')
require('babel-register')
require('babel-polyfill')
var PrivateKeyProvider = require("truffle-privatekey-provider");


var privDev
    = "4B840E1D567A493B9B21308D2C85616C56CD664C97520B041F539EC5F35F62AA"



module.exports = {


    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },


    networks: {
        test: {
            host: "localhost",
            port: 8545,
            network_id: "5777",
            peovider : new PrivateKeyProvider(privDev, "http://localhost:8545"),
            gasPrice: 2000,
            gas: 2000000,
        }

    },

    mocha: {
        useColors: true,
        // reporter: 'eth-gas-reporter',

    },
};