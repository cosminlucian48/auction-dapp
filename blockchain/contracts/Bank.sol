pragma solidity ^0.8.4;

import "./Token.sol";

contract Bank{
    mapping(address => uint256) public accounts;

    constructor(){}

    function totalAssets() view external returns(uint256){ //view doar vede
        return address(this).balance;
    }

    function deposit() payable external{
        require(msg.value > 0, "Ceva mai mare decat 0.");
        accounts[msg.sender] +=msg.value;
    }

    function withdraw(uint _amount, address _tokenContract) external{
        require(_amount<= accounts[msg.sender], "Nu ai destul!");

        accounts[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);  //transfera din contract la user
        
        Token yieldToken = Token(_tokenContract);
        yieldToken.mint(msg.sender, 1 ether);

    }
}