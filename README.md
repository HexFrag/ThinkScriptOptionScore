# ThinkScriptOptionScore
Adds a lower chart to ToS charts that scores the option based on a series of checks. These checks where 'made' by u/dj_options from reddit r/algotrading,
original post can be found here: https://www.reddit.com/r/algotrading/comments/ldkt1z/options_trading_with_automated_ta/  
The chart plots the score, and displays the all of the checks values in labels, color coded for pass/fail


# Disclaimer
Only made for Call options, needs different checks for put options which is maybe something planned.
Not financial advice or guaranteed to provide profitable call options, this works better with an API so it can scan hundreds of options vs just displying on a user selected options.


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
![Picture of chart in action](.//HexFrag/ThinkScriptOptionScore/blob/main/optionscorechart.PNG)

# Installation/Usage
Download the file OptionsScoreSTUDY.ts. With ToS open go to Charts. Click on Studies > Edit Study. Click Import, then select the OptionsScoreSTUDY.ts file. Alternatively, you can create your own study in ToS and copy/paste into the editor.   
Add the study to your options charts just like any other study.  
To use, make sure you have the study added, then open any call option in a chart with the study, and view it.
