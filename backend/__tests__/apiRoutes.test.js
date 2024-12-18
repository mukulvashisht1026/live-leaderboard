const request = require('supertest');
const app = require('../src/app'); // Ensure this is your Express app entry point

jest.mock('../src/services/leaderboardService.js', () => ({
  getLeaderboard: jest.fn(),
}));

jest.mock('../src/services/symbolService.js', () => ({
  getSymbols: jest.fn(),
}));

jest.mock('../src/services/tradeService.js', () => ({
  handleNewTrade: jest.fn(),
}));

const { getLeaderboard } = require('../src/services/leaderboardService.js');
const { getSymbols } = require('../src/services/symbolService.js');
const { handleNewTrade } = require('../src/services/tradeService.js');

describe('API Routes', () => {
  describe('POST /trade', () => {
    afterEach(() => {
        // Reset the call count for handleNewTrade
        handleNewTrade.mockClear();
      });

    it('should process a new trade successfully', async () => {
      const mockTrade = { traderId: 'Trader1', symbol: 'BTC', timestamp: '2024-12-15T12:00:00Z', volume: 100 };

      const res = await request(app).post('/api/trade').send(mockTrade);
        // console.log(res, 'res is');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Trade processed successfully');
      expect(handleNewTrade).toHaveBeenCalledWith(mockTrade);
    });

    it('should return an error for invalid trade data', async () => {
      const res = await request(app).post('/api/trade').send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid trade data');
    });
  });

  describe('POST /api/trade/batch', () => {
   
    afterEach(() => {
        // Reset the call count for handleNewTrade
        handleNewTrade.mockClear();
      });

    it('should process a batch of trades successfully', async () => {
      const mockTrades = [
        { traderId: 'Trader1', symbol: 'BTC', timestamp: '2024-12-15T12:00:00Z', volume: 100 },
        { traderId: 'Trader2', symbol: 'ETH', timestamp: '2024-12-15T13:00:00Z', volume: 200 },
      ];

      const res = await request(app).post('/api/trade/batch').send(mockTrades);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Trade batch processed successfully');
      expect(handleNewTrade).toHaveBeenCalledTimes(mockTrades.length);
    });

    it('should return an error for an empty trade batch', async () => {
      const res = await request(app).post('/api/trade/batch').send([]);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid or empty trade batch data');
    });
  });

  describe('GET /symbols', () => {
    it('should fetch all symbols', async () => {
      const mockSymbols = ['BTC', 'ETH', 'XRP'];
      
      getSymbols.mockResolvedValue(mockSymbols);

      const res = await request(app).get('/api/symbols');

      expect(res.status).toBe(200);
      expect(res.body.symbols).toEqual(mockSymbols);
      expect(getSymbols).toHaveBeenCalled();
    });
  });

  describe('GET /leaderboard/:symbol/date/:date', () => {
    it('should fetch leaderboard data for a symbol', async () => {
      const mockLeaderboard = [{ rank: 1, traderId: 'Trader1', volume: 100 }];
      getLeaderboard.mockResolvedValue(mockLeaderboard);

      const res = await request(app).get('/api/leaderboard/BTC/date/2024-12-15');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockLeaderboard);
      expect(getLeaderboard).toHaveBeenCalledWith('BTC', '2024-12-15');
    });

    it('should return an error if fetching leaderboard fails', async () => {
      getLeaderboard.mockRejectedValue(new Error('Service error'));

      const res = await request(app).get('/api/leaderboard/BTC/date/2024-12-15');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Failed to fetch leaderboard');
    });
  });

});
