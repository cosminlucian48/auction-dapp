
require("@nomiclabs/hardhat-waffle");
// const { ethers } = require("hardhat");
const secrets = require("./environment/secrets.json");

task("accounts", "Prints the list of accounts", async() =>{
  const accounts = await ethers.getSigners();
  for (const account of accounts){
    console.log(account.address);
  }
})


module.exports = {
  solidity: "0.8.4",
  paths:{
    sources:"./blockchain/contracts",
    tests:"./blockchain/test",
    cache:"./blockchain/cache",
    artifacts:"./blockchain/artifacts"
  },
  networks:{
    mumbai:{
      url: secrets.mumbainode,
      accounts: [secrets.privateKey]
    },
    // ethereum:{
    //   url: secret.ethereumnode,
    //   accounts: [secret.privateKeyEth]
    // }
  } 
};