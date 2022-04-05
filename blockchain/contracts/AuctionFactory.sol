pragma solidity 0.7.1;
import "./Auction.sol";

contract AuctionFactory {
    Auction[] public auctions;
    address[] public auctionsAddresses;
    address[] public auctionsNFTAddresses;
    mapping(address => address[]) public auctionNFTmap;

    function getContractCount() public view returns (uint256) {
        return auctions.length;
    }

    function newAuction(
        uint256 nftId,
        string memory name,
        uint256 initialBid,
        uint256 time,
        address recipient
    ) public returns (Auction newContract) {
        Auction auc = new Auction(nftId, recipient, time, name, initialBid);
        auctions.push(auc);
        auctionsAddresses.push(address(auc));
        return auc;
    }

    function checkAuction(uint256 number) public view returns (address auc) {
        return auctionsAddresses[number];
    }

    function getAuciton(uint256 number) public view returns (Auction auc) {
        return auctions[number];
    }

    function getAllAuctionsAddresses()
        public
        view
        returns (address[] memory listOfAuctions)
    {
        return auctionsAddresses;
    }

    // function getAllAuctionNFTAddresses() public view returns (address[] memory){
    //     return auctionsNFTAddresses;
    // }
    // function getNftAddressForSender() public view returns (address[] memory){
    //     return auctionNFTmap[msg.sender];
    // }
}
