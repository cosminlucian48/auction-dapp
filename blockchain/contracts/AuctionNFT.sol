pragma solidity 0.7.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract AuctionNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(address => uint256[]) public userOwnedTokens;
    mapping(uint256 => uint256) public tokenIsAtIndex;
    uint256[] public nftIds;

    constructor() public ERC721("AuctionNFT", "ANFT") {
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
        tokenIsAtIndex[newItemId] = arrayLength - 1;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    function getNFTIdsForUser()
        public
        view
        returns (uint256[] memory)
    {
        return userOwnedTokens[msg.sender];
    }

    function getNftIds() public view returns (uint256[] memory) {
        return nftIds;
    }

    function deleteNftFromIndex(uint index, address owner) public{
        uint256[] storage array = userOwnedTokens[owner];

        // for(uint poz = index; poz< array.length-1;poz++){
        //     array[poz] = array[poz+1];
        //     uint256 nftIdLocal = array[poz];
        //     tokenIsAtIndex[nftIdLocal] = tokenIsAtIndex[nftIdLocal] - 1;
        // }
        array[index] = array[array.length-1];
        uint256 nftIdLocal = array[array.length -1];
        array.pop();
        
        tokenIsAtIndex[nftIdLocal] = index;
        userOwnedTokens[owner] = array;
    }

    function transferNft(address from, address to, uint256 nftId) public {
        approve(to,nftId);
        safeTransferFrom(from,to,nftId);
        uint index = tokenIsAtIndex[nftId];
        deleteNftFromIndex(index, from);

        userOwnedTokens[to].push(nftId);
        uint256 arrayLength = userOwnedTokens[to].length;
        tokenIsAtIndex[nftId] = arrayLength;
    }
    function getSmt() public view returns (uint256){
        return userOwnedTokens[msg.sender][userOwnedTokens[msg.sender].length-1];
    }
}
