# Tokensale

This is repo for main MoonShard Tokensale event.

# Token description
Token name - MoonShard
Token tiker - SHARD
totalsupply ~= 95 mln

Token distribution:
1st phase token sale = 10m tokens
2nd phase token sale = 25m + 25m (for ether and usd)
cashback progr = 10m tokens
top-100 bloggers referal program = 5m tokens
crew fee = 10m tokens (freezed on 1 year)
airdrops and other campaigns = 10m tokens

Price on first phase ~ 0.5 USD for token
Price on second phase ~1 USD for token (for ether) ~1.75 USD (for paypal)

Circulation supply
~ inital phase = 10 mln tokens (airdrops and other)
~ after first phase = 25 mln tokens


# Tokensale Phases
It will be two phases of crowdsale.
First one will give a limited amount of tokens for Ether, will continue due limited amount of time, maxSupply is 5m usd, price for token is low.

Second will work in all rest lifetime of a project. on this phase we will accept Ether&USD for standard price, which will be in ~x15 higher than on first phase.

# Architecture

As far we should mention, that we have some masterchain contract with erc20 token, bridge to sidechain on that token, and, inside sidechain it should look like Ether ("hard spoon" pattern).

All mechanics with MoonShard contracts are work inside sidechain , token contract on masterchain works in Ethereum.

Therefore we should have **two** contracts of tokensale on second stage.  One will accept **Ether** and give user erc tokens on masterchain. Second will work with PayPal bot and accept USD, and will be on sidechain.
