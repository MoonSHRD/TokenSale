pragma solidity ^0.4.24;

import "./MoonshrdTokenSaleStage.sol";


contract MainnetPreSale is MoonshrdTokenSaleStage {
    uint8 public pennyPrice = 50;
    uint256 distributionLimit = 1e6;

    function() external payable {
        buyTokens(msg.sender);
    }

    constructor(address _wallet, address _updater, MoonShardToken _token) public {
        wallet = _wallet;
        token = _token;
        state = TokenSaleState.Ready;
        owner = msg.sender;
        updater = _updater;
    }


    function buyTokens(address _beneficiary) public payable {
        uint256 weiAmount = msg.value;

        uint256 tokens = _getTokenAmount(weiAmount);

        weiRaised = weiRaised.add(weiAmount);

        _processPurchase(_beneficiary, tokens);
        emit TokenPurchase(
            msg.sender,
            _beneficiary,
            weiAmount,
            tokens
        );

    }

    function _processPurchase(address _beneficiary, uint256 _tokenAmount) internal
    {
        //Tokens
    }

    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256)
    {
        return _weiAmount.mul(rate);

    }



    function _forwardFunds() internal {
        wallet.transfer(msg.value);
    }

    function getPennyPrice() internal pure returns (uint256){
        return 50;
    }

}
