pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./MoonShardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract MoonshrdTokenSaleStage is Ownable {
    using SafeMath for uint256;
    uint256 safeConst = 1000000000000000000;

    enum TokenSaleState {Ready, Running, Paused, Finished}

    MoonShardToken public token;
    TokenSaleState public state;

    address public updater;
    address public wallet;
    uint256 public rate;
    uint256 public weiRaised;



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
        address indexed purchaser,
        address indexed beneficiary,
        uint256 value,
        uint256 amount
    );

    event UpdaterRoleAssigned(address indexed _address);

    function setEtherPrice(uint256 _pennyPerEthAmount) external onlyStuff {
        rate = safeConst.div(_pennyPerEthAmount.mul(getPennyPrice()));
    }

    function setUpdater(address _updater) external onlyOwner {
        updater = _updater;
        emit UpdaterRoleAssigned(_updater);
    }

    function start() external onlyOwner isWaiting {
        require((state == TokenSaleState.Ready) || (state == TokenSaleState.Paused));
        require(rate > 0, "Conversion rate is not set");
        state = TokenSaleState.Running;
    }

    function getPennyPrice() internal pure returns (uint256);

}
