const Tx = require('ethereumjs-tx').Transaction
const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/8df36a84911b4f208303ccd8a733b90e"; // Your RCkP URL goes here
const web3 = new Web3(rpcURL);
const dotenv = require("dotenv")
dotenv.config()
const account1 = "0xaF1B83016223cE17377984fc6aCD884e8b8A584F";
const account2 = "0xba6b9C3835dF8a82328C549F50E1D369e31b0B48";

// const privateKey1 = process.env.PRIVATE_KEY_1
// const privateKey2 = process.env.PRIVATE_KEY_2
// console.log("sdsddsdsdsds",privateKey1)
// privateKey1='0x5ffab17266fb40e4844935d9fc317bccb663c576b91708527439578f8f01cc6e';
// privateKey2='0xac1c5713206654e7cd538785477d335f302437c29603ab6dabba1c2f5fc2176f';

const privateKey1 = Buffer.from(JSON.stringify(0x5ffab17266fb40e4844935d9fc317bccb663c576b91708527439578f8f01cc6e), 'hex')
const privateKey2 = Buffer.from(JSON.stringify(0xac1c5713206654e7cd538785477d335f302437c29603ab6dabba1c2f5fc2176f), 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})