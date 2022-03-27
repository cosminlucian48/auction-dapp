const fs = require('fs');
const { ethers } = require('hardhat');

async function main(){

    const AuctionFactoryContract = await ethers.getContractFactory("AuctionFactory");
    const auctionFactory = await AuctionFactoryContract.deploy();
    await auctionFactory.deployed();
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