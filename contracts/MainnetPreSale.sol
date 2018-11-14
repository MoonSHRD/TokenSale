pragma solidity ^0.4.24;

import "./MoonshrdTokenSaleStage.sol";


import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./MoonShardToken.sol";





contract MainnetPreSale is MoonshrdTokenSaleStage {
    uint8 public pennyPrice = 50;
    uint256 tokensCup = 10000000 * (uint256(10) ** 18);
    uint256 tokensSaled;

    constructor(address _wallet, address _updater, MoonShardToken _token) public {
        wallet = _wallet;
        token = _token;
        state = TokenSaleState.Ready;
        owner = msg.sender;
        updater = _updater;
    }

    function() external payable {
        buyTokens(msg.sender, msg.value);
    }

    function buyTokens(address _beneficiary, uint _weiAmount) internal {
        require(_weiAmount != 0, "(weiAmount must be more then 0)");        
        uint256 tokensAmount = _getTokenAmount(_weiAmount);
       
        require((tokensSaled.add(tokensAmount)) <= tokensCup, "(was reached the limit of tokens)");  
        tokensSaled = tokensSaled.add(tokensAmount);    
        weiRaised = weiRaised.add(_weiAmount);

        token.mint(_beneficiary, tokensAmount);

        emit TokenPurchase(
            msg.sender,
            _beneficiary,
            _weiAmount,
            tokensAmount
        );
    }

    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256)
    {
        return _weiAmount.mul(rate);
    }

    function getPennyPrice() internal pure returns (uint256){
        return 50;
    }
      

}
