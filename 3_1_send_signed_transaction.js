const dotenv = require("dotenv")
dotenv.config()
const Web3 = require("web3");
const Tx = require('ethereumjs-tx').Transaction

const rpcURL = "https://ropsten.infura.io/v3/8df36a84911b4f208303ccd8a733b90e"; // Your RCkP URL goes here
const web3 = new Web3(rpcURL);


const account1 = '0xaF1B83016223cE17377984fc6aCD884e8b8A584F';
const account2 = '0xba6b9C3835dF8a82328C549F50E1D369e31b0B48'; 

const privateKey1 = Buffer.from(process.env['PRIVATE_KEY_1']);
const privateKey2 = Buffer.from(process.env['PRIVATE_KEY_2'],'hex');
console.log("privateKey1",privateKey1);
console.log("privateKey2",privateKey2);

const account1PrivateKey = Buffer.from(privateKey1, 'hex');
console.log("PRIVATE_KEY_1",process.env["PRIVATE_KEY_1"])
console.log("Buffer value",account1PrivateKey)

const transferEth = async ()=>{
    try {
        
        const txNonce= await web3.eth.getTransactionCount(account1);
        const txObject = {
            nonce:    web3.utils.toHex(txNonce),
            to:       account2,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
          }
          const tx = new Tx(txObject, { chain: "ropsten", hardfork: "petersburg" });
        tx.sign(account1PrivateKey);

        const sesrializedTx =  tx.serialize();
        const raw = '0x' + sesrializedTx.toString('hex ');
        const response = await web3.eth.sendSignedTransaction(raw);
        console.log("Hash", response)
    } catch (e) {
        console.log(e);
    }
}

transferEth();