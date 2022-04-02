const fs = require('fs');
const { ethers } = require('hardhat');

async function main(){

    // const AuctionNFT = await ethers.getContractFactory('AuctionNFT');
    const AuctionFactoryContract = await ethers.getContractFactory("AuctionFactory");

    // const auctionNFT = await AuctionNFT.deploy();
    const auctionFactory = await AuctionFactoryContract.deploy();

    // await auctionNFT.deployed();
    await auctionFactory.deployed();

    // console.log("The auction nft contract was deployed to: " + auctionNFT.address);
    console.log("The auction factory contract was deployed to: " + auctionFactory.address);

    let addresses = {
        "auctionFactoryContract": auctionFactory.address
    };
    let addressesJSON = JSON.stringify(addresses);
    fs.writeFileSync("environment/contract-address.json", addressesJSON);

}

main()
.then(() => {
    process.exit(0);
})
.catch((error) => {
    console.error(error);
    process.exit(1);
})