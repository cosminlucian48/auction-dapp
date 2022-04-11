
require("@nomiclabs/hardhat-waffle");
// const { ethers } = require("hardhat");
const secrets = require("./environment/secrets.json");

// task("accounts", "Prints the list of accounts", async() =>{
//   const accounts = await ethers.getSigners();
//   for (const account of accounts){
//     console.log(account.address);
//   }
// })


module.exports = {
  solidity: "0.7.1",
  paths:{
    sources:"./blockchain/contracts",
    tests:"./blockchain/test",
    cache:"./blockchain/cache",
    artifacts:"./blockchain/artifacts"
  },
  networks:{
    local:{// parametrii blockchainului local
      url: secrets.localnode,
      accounts: [secrets.privateKeyLocalAccount]
    },
    mumbai:{
      url: secrets.mumbainode,
      accounts: [secrets.privateKey]
    }
  } 
};
