
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
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // match any network
          },
/*         coverage: {
            host: "localhost",
            network_id: "*",
            port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
            gas: 0xfffffffffff, // <-- Use this high gas value
            gasPrice: 0x01      // <-- Use this low gas price
          },  */         
        test: {
            host: "localhost",
            port: 8545,
            network_id: "5777",
            provider : new PrivateKeyProvider(privDev, "http://localhost:8545"),
            gasPrice: 2000,
            gas: 2000000,
        }

    },

    mocha: {
        useColors: true,
/*         reporter: 'eth-gas-reporter',
        reporterOptions : {
            currency: 'USD',
            gasPrice: 1
          } */

    },
};