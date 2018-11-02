pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract MoonShardToken is StandardToken, Ownable {

 

    string public name = "MoonShard";
    uint8 public decimals = 18;
    string public symbol = "SHARD";




    function mint(address _to, uint _val) external onlyOwner {
        require(_val > 0);
        totalSupply_.add(_val);
//        require(totalSupply_ <= maxSupply);
        balances[_to] += _val;

        emit Transfer(0x0, _to, _val);
    }

}