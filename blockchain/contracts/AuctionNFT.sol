pragma solidity 0.7.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract AuctionNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string pinataURL;

    constructor(string memory pin) public ERC721("AuctionNFT1", "NFT") {
        pinataURL = pin;
        _mint(msg.sender, 1);
    }

    // function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256){
    //     _tokenIds.increment();

    //     uint256 newItemId = _tokenIds.current();
    //     _mint(recipient, newItemId);
    //     _setTokenURI(newItemId, tokenURI);

    //     return newItemId;
    // }

    function getPinataUrl() public view returns(string memory){
        return pinataURL;
    }

    function getOwner() public view returns(string memory){
        return _owner;
    }
}