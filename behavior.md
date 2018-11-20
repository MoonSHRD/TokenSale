  Contract: MainnetPreSale
    Owner
      ✓ should not be able to start crowdsale, until conversion rate is not set (23002 gas)
      ✓ should grant permissions to updater (29883 gas)
      ✓ should be able to pause crowdsale (27179 gas)
      ✓ should be able to start crowdsale (91571 gas)
    Price updater
      ✓ should be able to set Rate (33100 gas)
      ✓ should be able to set cooldown of rate updating (42360 gas)
    User
      ✓ should be able to send ether and recieve tokens (110036 gas)
      ✓ should revert transaction when msg.value equal 0 (21260 gas)
    Crowdsale part 1
      ✓ should revert transaction when was reached cup of tokens (22184 gas)
      ✓ should finish crowdsale and grant command of token to CrowdsalePartTwo (38210 gas)
      ✓ should set token for CrowdsalePartTwo (43609 gas)

  Contract: MoonShardToken
    Token
      ✓ should mint tokens to account and change TotalSupply (66623 gas)
      ✓ should revert transaction when maxSupply of tokens was reached (24587 gas)

·--------------------------------------------------------------------------|----------------------------·
|                                   Gas                                    ·  Block limit: 6721975 gas  │
············································|······························|·····························
|  Methods                                  ·          1 gwei/gas          ·       195.81 usd/eth       │
··························|·················|·········|·········|··········|··············|··············
|  Contract               ·  Method         ·  Min    ·  Max    ·  Avg     ·  # calls     ·  usd (avg)  │
··························|·················|·········|·········|··········|··············|··············
|  MainnetPreSale         ·  finish         ·      -  ·      -  ·   38210  ·           1  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  MainnetPreSale         ·  pause          ·      -  ·      -  ·   27179  ·           1  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  MainnetPreSale         ·  setCooldown    ·      -  ·      -  ·   42360  ·           1  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  MainnetPreSale         ·  setEtherPrice  ·  33100  ·  63100  ·   48100  ·           2  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  MainnetPreSale         ·  setUpdater     ·      -  ·      -  ·   29883  ·           1  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  MainnetPreSale         ·  start          ·      -  ·      -  ·   28471  ·           1  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  MainnetPreSalePartTwo  ·  setToken       ·      -  ·      -  ·   43609  ·           1  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  MoonShardToken         ·  mint           ·      -  ·      -  ·   66623  ·           1  ·       0.01  │
··························|·················|·········|·········|··········|··············|··············
|  Deployments                              ·                              ·  % of limit  ·             │
············································|·········|·········|··········|··············|··············
|  MainnetPreSale                           ·      -  ·      -  ·  953214  ·      14.2 %  ·       0.19  │
············································|·········|·········|··········|··············|··············
|  MainnetPreSalePartTwo                    ·      -  ·      -  ·  946239  ·      14.1 %  ·       0.19  │
············································|·········|·········|··········|··············|··············
|  MoonShardToken                           ·      -  ·      -  ·  972471  ·      14.5 %  ·       0.19  │
·-------------------------------------------|---------|---------|----------|--------------|-------------·

  13 passing (5s)