const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("auction App", ()=>{
    let auction, token, owner, address_1, address_2;
    let addresses;

    beforeEach(async () => {
        const auctionContract = await ethers.getContractFactory("Auction");
        auction = await auctionContract.deploy(100);
        await auction.deployed();

        [owner, address_1, address_2, ...addresses] = await ethers.getSigners();
    });

    describe("Deployment", () =>{
        it("Should have highest bid of 0", async() =>{    // toate callurile catre smartcontract sunt promises
            expect(await auction.fHighestBid()).to.equal("0");
        });
    });

    describe("Bids", () =>{
        const oneEth = ethers.utils.parseEther("1.0"); //utility function to allow as to get ether
        
        it("Should have highest bid != 0", async() =>{    // toate callurile catre smartcontract sunt promises
            await auction.connect(address_1).bid({value:oneEth});
            expect(await auction.fHighestBid()).to.equal(oneEth);
        });

        it("Should have highest bid != 0", async() =>{    // toate callurile catre smartcontract sunt promises
            await auction.connect(address_1).bid({value:oneEth});
            await auction.connect(address_1).withdraw();
            expect(await auction.senderPendingReturns()).to.equal("0");
        });
    });


    // describe("Deployment", () =>{
    //     it("Should have totalAssets of 0", async() =>{    // toate callurile catre smartcontract sunt promises
    //         expect(await auction.totalAssets()).to.equal("0");
    //     });
    //     it("Should have 0 tokens, and 0 deposit in owner account", async() =>{
    //         expect(await auction.accounts(owner.address)).to.equal("0");
    //         expect(await token.balanceOf(owner.address)).to.equal("0");
    //     });
    //     it("Should have 0 tokens, and 0 deposit in address_1 account", async() =>{
    //         expect(await auction.accounts(address_1.address)).to.equal("0");
    //         expect(await token.balanceOf(address_1.address)).to.equal("0");
    //     });
    //     it("Should have 0 tokens, and 0 deposit in address_2 account", async() =>{
    //         expect(await auction.accounts(address_2.address)).to.equal("0");
    //         expect(await token.balanceOf(address_2.address)).to.equal("0");
    //     });
    // });

    // describe("Deposit and Withdrawal", () => {
    //     const oneEth = ethers.utils.parseEther("1.0"); //utility function to allow as to get ether

    //     it("Should let owner deposit 1 ther, then totalAssets should be 1 ether, and accounts [owner] should be 1 ether", async () => {
    //         await auction.connect(owner).deposit({value:oneEth});
    //         expect(await auction.totalAssets()).to.equal(oneEth);
    //         expect(await auction.accounts(owner.address)).to.equal(oneEth);
    //     });
    //     it("Should let account_1 Deposit and Withdraw 1 Ether, then have 1 FREE", async() =>{
    //         await auction.connect(address_1).deposit({value:oneEth});
    //         await auction.connect(address_1).withdraw(oneEth, token.address);
    //         expect(await auction.totalAssets()).to.equal("0");
    //         expect(await token.balanceOf(address_1.address)).to.equal(oneEth);
    //     });
    //     it("Should fail when trying to withdraw money you haven't deposited", async() =>{
    //         await expect(auction.connect(address_2).withdraw(oneEth, token.address)).to.be.revertedWith("Nu ai destul!");
    //     });
    // })

})