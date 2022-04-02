pragma solidity 0.7.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract AuctionNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable public _owner;

    constructor() public ERC721("myNFT", "NFT") {
        _owner = msg.sender;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

// // SPDX-License-Identifier: MIT
// pragma solidity >=0.6.0 <0.8.0;
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
//  contract NFT is ERC721, Ownable {
//     address payable public _owner;
//     mapping(uint256 => bool) public sold;
//     mapping(uint256 => uint256) public price;
//     event Purchase(address owner, uint256 price, uint256 id, string uri);
//     constructor() ERC721("YOUR TOKEN", "TOKEN") {
//      _owner = msg.sender;
//     }
// function mint(string memory _tokenURI, uint256 _price)
//  public
//  onlyOwner
//  returns (bool)
//  {
//     uint256 _tokenId = totalSupply() + 1;
//     price[_tokenId] = _price;
//     _mint(address(this), _tokenId);
//     _setTokenURI(_tokenId, _tokenURI);
//     return true;
//  }
// }