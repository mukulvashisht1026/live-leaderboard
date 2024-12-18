const express = require('express');
const { getLeaderboard } = require('../services/leaderboardService');
const { handleNewTrade, getTrades } = require('../services/tradeService');
const { getSymbols } = require('../services/symbolService');

const router = express.Router();

// Endpoint to handle a new trade
    router.post('/trade', (req, res) => {
    const { traderId, symbol, timestamp, volume } = req.body;

    if (!traderId || !symbol || !timestamp || !volume) {
        return res.status(400).json({ error: 'Invalid trade data' });
    }

    try {
        handleNewTrade({ traderId, symbol, timestamp, volume });
        res.status(200).json({ message: 'Trade processed successfully' });
    } catch (error) {
        console.log('error is: ', error);
        res.status(500).json({ error: 'Failed to process trade' });
    }
    });

    router.post('/trade/batch', (req, res) => {
        const tradeList = req.body;
    
        if (!tradeList || tradeList.length < 1) {
            return res.status(400).json({ error: 'Invalid or empty trade batch data' });
        }
    
        try {
            for (let i = 0; i < tradeList.length; i++) {
                const { traderId, symbol, timestamp, volume } = tradeList[i];
                
                handleNewTrade({ traderId, symbol, timestamp, volume });

            }
            res.status(200).json({ message: 'Trade batch processed successfully' });
        } catch (error) {
            console.log('error is: ', error);
            res.status(500).json({ error: 'Failed to process trade batch' });
        }
        });

    router.get('/symbols', async(req, res) => {
        try {
            const symbols = await getSymbols();
            console.log('symbolsList is', symbols)
            res.status(200).json({symbols});
        } catch (error) {
            console.log("error while fetching symbols from leaderboard", error);
        }
    });

// Endpoint to fetch the leaderboard for a specific symbol
router.get('/leaderboard/:symbol/date/:date', async (req, res) => {
  const { symbol, date } = req.params;
  try {
    const leaderboard = await getLeaderboard(symbol, date);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});


router.post('/traderData', async (req, res) => {
    const { traderId, dateString, symbol } = req.body;
    try {
        const trades = await getTrades(traderId, symbol, dateString);
        res.status(200).json({data: trades, statusCode: 200, message: "trade data fetched successfully"});
    } catch (error) {
        console.log("error occured while fetching data for a trader: ", error);
        res.status(500).json({ message: 'Failed to fetch trader data', statusCode: 500})
    }
});

module.exports = router;
