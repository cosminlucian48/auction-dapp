pragma solidity 0.7.1;
import "./Auction.sol";
import "./AuctionNFT.sol";


contract AuctionFactory{
    
    Auction[] public auctions;
    AuctionNFT[] public auctionNFTs;
    address[] public auctionsAddresses;
    address[] public auctionsNFTAddresses;
    mapping(address => address) public auctionNFTmap;
    function getContractCount() public view returns(uint){
        return auctions.length;
    }
    
    function newAuction(string memory name, uint initialBid, uint time,address recipient, string memory tokenURI, string memory pinataUrl) public returns(Auction newContract){
        
        AuctionNFT auctionNFT = new AuctionNFT(pinataUrl);
        Auction auc = new Auction(time, name,initialBid,address(auctionNFT));
        

        // auctionNFT.mintNFT(recipient, tokenURI);

        auctions.push(auc);
        auctionsAddresses.push(address(auc));

        auctionNFTs.push(auctionNFT);
        auctionsNFTAddresses.push(address(auctionNFT));

        auctionNFTmap[address(auc)] = address(auctionNFT);
        return auc;
    }


    function checkAuction(uint number) public view returns(address auc){
        return auctionsAddresses[number];
    }

    function getAuciton(uint number) public view returns(Auction auc){
        return auctions[number];
    }
    function getAllAuctionsAddresses() public view returns (address[] memory listOfAuctions){
        return auctionsAddresses;
    }
    
    function getAllAuctionNFTAddresses() public view returns (address[] memory){
        return auctionsNFTAddresses;
    }
    function getNftAddressForSender() public view returns (address){
        return auctionNFTmap[msg.sender];
    }

}