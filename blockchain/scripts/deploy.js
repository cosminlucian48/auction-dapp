const fs = require('fs');
const { ethers } = require('hardhat');

async function main(){

    const AuctionContract = await ethers.getContractFactory("Auction");
    const auction = await AuctionContract.deploy(30);
    await auction.deployed();
    console.log("The auction contract was deployed to: " + auction.address);

    let addresses = {
        "auctioncontract": auction.address
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