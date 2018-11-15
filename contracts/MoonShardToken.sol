pragma solidity ^0.4.24;


import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";



contract MoonShardToken is StandardToken, Ownable {
    using SafeMath for uint256;
 
    string public name = "MoonShard";
    uint8 public decimals = 18;
    string public symbol = "SHARD";
    uint256 constant maxSupply = 90000000 * (uint256(10) ** 18); 

    function mint(address _to, uint256 _val) external onlyOwner {
        require(_val > 0);
        require((totalSupply_.add(_val)) <= maxSupply, "(was reached the limit of max tokenSpply)");
        totalSupply_ = totalSupply_.add(_val);
        balances[_to] = balances[_to].add(_val);

        emit Transfer(0x0, _to, _val);
    }
}