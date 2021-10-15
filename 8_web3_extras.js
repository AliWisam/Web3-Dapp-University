const dotenv = require("dotenv");
dotenv.config();
const Web3 = require("web3");
var _ = require('underscore');
const Tx = require("ethereumjs-tx").Transaction;
const rpcURL = "https://mainnet.infura.io/v3/8df36a84911b4f208303ccd8a733b90e"; // Your RCkP URL goes here
const web3 = new Web3(rpcURL);

const getGasPrice = async () => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice", web3.utils.fromWei(gasPrice, "gwei"));
  } catch (error) {
    console.log(error);
  }
};

const generateHash = async (stringToEncode) => {
  try {
    console.log("SHA3", web3.utils.sha3(stringToEncode));
    console.log("Keccak256", web3.utils.keccak256(stringToEncode));
  } catch (error) {
    console.log(error);
  }
};

const generateRandomHex = async (bytes) => {
  try {
    console.log("Random Hex", web3.utils.randomHex(bytes));
  } catch (error) {
    console.log(eror);
  }
};

const underScoreLibrary = async () => {
  try {
    // Get access to the underscore JS library    
    console.log(_)
    _.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
        console.log(key)
      })

  } catch (error) {
    console.log(error);
  }
};
// getGasPrice();
// generateHash("aliwisam");
// generateRandomHex(2);
underScoreLibrary();
