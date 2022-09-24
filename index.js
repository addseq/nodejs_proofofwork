// Blockchain - an array of blocks of the same structure
// each block would be of the class Block
const SHA256 = require("crypto-js/sha256")
const Blockchain = []

class Block {
  constructor(previousBlockHash, blockData, blockNumber) {
    this.previousBlockHash = previousBlockHash;
    this.blockData = blockData;
    this.blockNumber = blockNumber;
    // this.blockHash = String(SHA256(previousBlockHash + blockData + blockNumber));
    this.proofOfWork();
    Blockchain.push(this);
  }

  proofOfWork() {
    let hash = String(SHA256(this.previousBlockHash + this.blockData + this.blockNumber + 0))
    let nonce;
    for (nonce=1; !hash.startsWith("0000"); nonce++) {
      hash = String(SHA256(this.previousBlockHash + this.blockData + this.blockNumber + nonce))
    }
    this.nonce = nonce
    this.blockHash = hash
  }
}

// Genesis block
new Block("", "Mined 50 BTC on Coinbase", 0)
console.log(Blockchain)

// Add blocks to the blockchain
while (true) {
  let data = prompt("Add data to the new block:")
  new Block(Blockchain[Blockchain.length-1].blockHash, data, Blockchain.length)
  console.log(Blockchain)
}

