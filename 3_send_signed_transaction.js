const Tx = require('ethereumjs-tx').Transaction
const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/8df36a84911b4f208303ccd8a733b90e"; // Your RCkP URL goes here
const web3 = new Web3(rpcURL);
const dotenv = require("dotenv")
dotenv.config()
const account1 = "0xaF1B83016223cE17377984fc6aCD884e8b8A584F";
const account2 = "0xba6b9C3835dF8a82328C549F50E1D369e31b0B48";

const privateKey1 = process.env.PRIVATE_KEY_1
const privateKey2 = process.env.PRIVATE_KEY_2
console.log("sdsddsdsdsds",privateKey1)

const privateKey1Buffer = Buffer.from('privateKey1', 'hex')
const privateKey2Buffer = Buffer.from('privateKey2', 'hex')
console.log('Buffer 1: ', privateKey1Buffer)
console.log('Buffer 2: ', privateKey2Buffer)
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
  tx.sign(privateKey1Buffer)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})