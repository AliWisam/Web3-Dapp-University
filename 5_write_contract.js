const dotenv = require("dotenv");
dotenv.config();
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

const rpcURL = "https://ropsten.infura.io/v3/8df36a84911b4f208303ccd8a733b90e"; // Your RCkP URL goes here
const web3 = new Web3(rpcURL);

const account1 = "0xaF1B83016223cE17377984fc6aCD884e8b8A584F";
const account2 = "0xba6b9C3835dF8a82328C549F50E1D369e31b0B48";

const privateKey1 = process.env.PRIVATE_KEY_1;
const privateKey2 = process.env.PRIVATE_KEY_2;

const privateKey1Buffer = Buffer.from(privateKey1, "hex");
const privateKey2Buffer = Buffer.from(privateKey2, "hex");

console.log("privateKey1 ", privateKey1);
console.log("privateKey2 ", privateKey2);

console.log("Buffer value ", privateKey1Buffer);

const transferEth = async () => {
  try {
    const txCount = await web3.eth.getTransactionCount(account1);

    const contractAddress = "0xd03696B53924972b9903eB17Ac5033928Be7D3Bc";
    const contractABI = [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "standard",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { name: "", type: "address" },
          { name: "", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "_from", type: "address" },
          { indexed: true, name: "_to", type: "address" },
          { indexed: false, name: "_value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "_owner", type: "address" },
          { indexed: true, name: "_spender", type: "address" },
          { indexed: false, name: "_value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
      },
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(800000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      to: contractAddress,
      data: contract.methods.transfer(account2, 1000).encodeABI()
    };
    const tx = new Tx(txObject, { chain: "ropsten", hardfork: "petersburg" });
    tx.sign(privateKey1Buffer);

    const sesrializedTx = tx.serialize();
    const raw = "0x" + sesrializedTx.toString("hex");
    const response = await web3.eth.sendSignedTransaction(raw);
    console.log("Hash", response);
  } catch (e) {
    console.log(e);
  }
};

transferEth();
