pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ReentrancyGuard.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./MoonShardToken.sol";




contract MoonshrdTokenSaleStage is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    uint256 safeConst = 1000000000000000000;
 

    enum TokenSaleState {Ready, Running, Paused, Finished}

    MoonShardToken public token;
    TokenSaleState public state;

    address public updater;
    address public wallet;
    uint256 public rate;
    uint256 public weiRaised;
    uint256 public cooldown = 0;
    uint256 public lastTimeRateUpdate;

    modifier isRuning() {
        require(state == TokenSaleState.Running);
        _;
    }

    modifier isWaiting() {
        require(state == TokenSaleState.Ready || state == TokenSaleState.Paused);
        _;
    }

    modifier onlyStuff() {
        require(msg.sender == owner || msg.sender == updater);
        _;
    }

    event TokenPurchase(
        address purchaser,
        address beneficiary,
        uint256 value,
        uint256 amount
    );

    event UpdaterRoleAssigned(address indexed _address);

    function setEtherPrice(uint256 _pennyPerEthAmount) external onlyStuff {
        require(block.timestamp >= (lastTimeRateUpdate + cooldown), "(cooldown since the last update has not yet expired)");
        rate = safeConst.div((safeConst.mul(getPennyPrice())).div(_pennyPerEthAmount));
        lastTimeRateUpdate = block.timestamp;
    }

    function setCooldown(uint256 _cooldown) external onlyStuff {
        cooldown = _cooldown;
    }

    function setUpdater(address _updater) external onlyOwner {
        updater = _updater;
        emit UpdaterRoleAssigned(_updater);
    }

    function start() external onlyOwner isWaiting {
        require(token != address(0), "(token was not set)");
        require(rate > 0, "(conversion rate is not set)");      
        state = TokenSaleState.Running;
    }

    function pause() external onlyOwner {
        state = TokenSaleState.Paused;
    }
    function finish(address _to) external onlyOwner {
        state = TokenSaleState.Finished;
        token.transferOwnership(_to);
    }
   
    function getPennyPrice() internal pure returns (uint256);

    function isContract(address account) internal view returns (bool) {
        uint256 size;    
        assembly { size := extcodesize(account) }
        return size > 0;
    }

}
