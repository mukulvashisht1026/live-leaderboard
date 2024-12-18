const { getLeaderboard } = require('../services/leaderboardService');
const { getSymbols } = require('../services/symbolService');

// Controller to fetch leaderboard
exports.fetchLeaderboard = async (req, res) => {
  const { symbol, date } = req.params;

  try {
    const leaderboard = await getLeaderboard(symbol, date);
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

// Controller to fetch all symbols
exports.fetchSymbols = async (req, res) => {
  try {
    const symbols = await getSymbols();
    res.status(200).json({ symbols });
  } catch (error) {
    console.error('Error fetching symbols:', error);
    res.status(500).json({ error: 'Failed to fetch symbols' });
  }
};
