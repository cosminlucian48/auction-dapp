pragma solidity 0.7.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuctionNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(address => uint256[]) public userOwnedTokens;
    mapping(uint256 => uint256) public tokenIsAtIndex;
    uint256[] public nftIds;

    constructor() public ERC721("AuctionNFT", "ANFT") {
        // _mint(msg.sender, 1);
    }

    function mintNFT(string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        nftIds.push(newItemId);
        userOwnedTokens[msg.sender].push(newItemId);
        uint256 arrayLength = userOwnedTokens[msg.sender].length;
        tokenIsAtIndex[newItemId] = arrayLength;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    function getNFTIdsForUser(address add)
        public
        view
        returns (uint256[] memory)
    {
        return userOwnedTokens[add];
    }

    function getNftIds() public view returns (uint256[] memory) {
        return nftIds;
    }
}
