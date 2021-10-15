const dotenv = require("dotenv");
dotenv.config();
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

const rpcURL = "https://mainnet.infura.io/v3/8df36a84911b4f208303ccd8a733b90e"; // Your RCkP URL goes here
const web3 = new Web3(rpcURL);

const getEvents = async () => {
  try {
    // get latest block number
    const getBlockNumber = await web3.eth.getBlockNumber();
    console.log("getBlockNumber", getBlockNumber);

    // get latest block
    const getBlock = await web3.eth.getBlock("latest");
    console.log("getBlock", getBlock);

    // get latest block number
    // const blockNumber = web3.eth.getBlockNumber();
    // console.log("blockNumber",blockNumber)

    // // get latest block
    // web3.eth.getBlock("latest").then(console.log);

   // get latest 10 blocks
   const getBN =  web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 10; i++) {
      web3.eth.getBlock(latest - i).then(console.log);
    }
  });
  } catch (e) {
    console.log(e);
  }
};

// get latest 10 blocks
const getLatestTenBlocks = () => {
  try {
    // get latest 10 blocks
    const getBN =  web3.eth.getBlockNumber().then((latest) => {
      for (let i = 0; i < 10; i++) {
        web3.eth.getBlock(latest - i).then(console.log);
      }
    });
  } catch (error) {}
};
getEvents();
// getLatestTenBlocks()