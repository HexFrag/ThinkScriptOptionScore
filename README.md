# ThinkScriptOptionScore
Adds a lower chart to ToS charts that scores the option based on a series of checks. These checks where 'made' by u/dj_options from reddit r/algotrading,
original post can be found here: https://www.reddit.com/r/algotrading/comments/ldkt1z/options_trading_with_automated_ta/

# Scoring
Here are all the checks for B-Score. If they are True, the counter gets increased by 1.

    RSI <=40

    Volume >=100

    Filled price <= Lower Bollinger band

    SMA ( 5 days) <= VWAP

    Spread >=0.05 (This might change in future)

    Filled price = Current Bid

    IV<=40

    Today gain <= 0

#
![OptionScoreChart](./optionsscorechart.png)
