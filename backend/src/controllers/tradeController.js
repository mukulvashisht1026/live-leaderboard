const { handleNewTrade: processTrade } = require('../services/tradeService');
const { getTrades } = require('../services/tradeService');

// Controller to process a single trade
exports.handleNewTrade = (req, res) => {
  const { traderId, symbol, timestamp, volume } = req.body;

  if (!traderId || !symbol || !timestamp || !volume) {
    return res.status(400).json({ error: 'Invalid trade data' });
  }

  try {
    processTrade({ traderId, symbol, timestamp, volume });
    res.status(200).json({ message: 'Trade processed successfully' });
  } catch (error) {
    console.error('Error processing trade:', error);
    res.status(500).json({ error: 'Failed to process trade' });
  }
};

// Controller to process a batch of trades
exports.handleBatchTrades = (req, res) => {
  const tradeList = req.body;

  if (!tradeList || tradeList.length < 1) {
    return res.status(400).json({ error: 'Invalid or empty trade batch data' });
  }

  try {
    tradeList.forEach(({ traderId, symbol, timestamp, volume }) => {
      processTrade({ traderId, symbol, timestamp, volume });
    });
    res.status(200).json({ message: 'Trade batch processed successfully' });
  } catch (error) {
    console.error('Error processing trade batch:', error);
    res.status(500).json({ error: 'Failed to process trade batch' });
  }
};

// Controller to fetch trader data
exports.fetchTraderData = async (req, res) => {
  const { traderId, dateString, symbol } = req.body;

  try {
    const trades = await getTrades(traderId, symbol, dateString);
    res
      .status(200)
      .json({ data: trades, statusCode: 200, message: 'Trade data fetched successfully' });
  } catch (error) {
    console.error('Error fetching trader data:', error);
    res.status(500).json({ message: 'Failed to fetch trader data', statusCode: 500 });
  }
};
