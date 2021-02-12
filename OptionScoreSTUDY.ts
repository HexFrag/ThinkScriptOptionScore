declare lower;
input dper = AggregationPeriod.FIFTEEN_MIN;
input p = FundamentalType.CLOSE;
input length = 20;
input averageType = AverageType.SIMPLE;

def _rsi = if IsNaN(RSI()) then 0 else RSI();
def step1 = If(_rsi <= 40, 1, 0);
def _vol = if IsNaN(volume(period = AggregationPeriod.DAY)) then 0 else volume(period = AggregationPeriod.DAY);
def step2 = If(_vol >= 100, 1, 0);

def filled = if IsNaN(close(GetSymbol(), dper, PriceType.LAST)) then 0 else close(GetSymbol(), dper, PriceType.LAST);
def lowerband = if IsNaN(MovingAverage(averageType, Fundamental(p, period = dper), length) - StDev(close, 20) * 2) then 0 else MovingAverage(averageType, Fundamental(p, period = dper), length) - StDev(close, 20) * 2;

def step3 = If(filled <= lowerband, 1, 0);

def sma5 = if IsNaN(MovingAverage(averageType, Fundamental(p, period = dper), 5)) then 0 else MovingAverage(averageType, Fundamental(p, period = dper), 5);
def vw = vwap();
def step4 = If(sma5 <= vw, 1, 0);


def bid = if IsNaN(close(priceType = PriceType.BID)) then 0 else close(priceType = PriceType.BID);
def ask = if IsNaN(close(priceType = PriceType.ASK)) then 0 else close(priceType = PriceType.ASK);

def spread = ask - bid;
def step5 = If(spread >= 0.05, 1, 0);

def step6 = If(filled equals bid, 1, 0);
def iv = if IsNaN(imp_volatility(GetUnderlyingSymbol(), priceType = PriceType.LAST) * 100) then 0 else imp_volatility(GetUnderlyingSymbol(), priceType = PriceType.LAST) * 100;

def step7 = if(iv <= 40, 1, 0);


def dailyOpen = if IsNaN(open(period = AggregationPeriod.DAY)) then 0 else open(period = AggregationPeriod.DAY);
def todaysGain = filled - dailyOpen;
def step8 = If(todaysGain <= 0, 1, 0);

def put = IsPut();

def score = step1 + step2 + step3 + step4 + step5 + step6 + step7 + step8;
plot s = score;

AddLabel(yes, if put then "PUT" else "CALL", if put then Color.RED else Color.GREEN);
AddLabel(yes, "Score:" + score, if score >= 6 then if put then Color.RED else Color.GREEN else Color.RED);
AddLabel(yes, "RSI:" + _rsi, if _rsi <= 40 then Color.GREEN else Color.RED);
AddLabel(yes, "Vol:" + _vol, if _vol >= 100 then Color.GREEN else Color.RED);
AddLabel(yes, "Bolngr:" + filled + "<=" + lowerband, if filled <= lowerband then Color.GREEN else Color.RED);
AddLabel(yes, "SMAVWAP:" + sma5 + "<=" + vw, if sma5 <= vw then Color.GREEN else Color.RED);
AddLabel(yes, "Spread:" + bid + "|" + ask, if spread >= 0.05 then Color.GREEN else Color.RED);
AddLabel(yes, "Filled:" + filled + "=" + bid, if filled equals bid then Color.GREEN else Color.RED);
AddLabel(yes, "IV:" + iv, if iv <= 40 then Color.GREEN else Color.RED);
AddLabel(yes, "Gain:" + todaysGain, if todaysGain <= 0 then Color.GREEN else Color.RED);
