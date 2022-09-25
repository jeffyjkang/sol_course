// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

contract Lottery {
  address public manager;
  address[] public players;

  constructor() {
    manager = msg.sender;
  }

  function getManager() public view returns (address) {
    return manager;
  }

  function enter() public payable {
    // instance.enter({from: add, value: web3.utils.toWei('.001', 'ether')})
    require(msg.value > .001 ether, 'Not enough ether sent');
    players.push(msg.sender);
  }

  function getRandNum() private view returns (uint) {
    return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
  }

  function pickWinner() public payable restricted('Need to be manager to pick winner') {
    uint index = getRandNum() % players.length;
    payable(players[index]).transfer(address(this).balance);
    players = new address[](0);
  }

  modifier restricted(string memory message) {
    require(msg.sender == manager, message);
    _;
  }

  function getPlayers() public view returns (address[] memory) {
    return players;
  }
}
