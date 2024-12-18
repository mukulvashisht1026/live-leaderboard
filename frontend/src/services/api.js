const API_URL = 'http://localhost:3000/api/symbols';

export const fetchSymbolsFromAPI = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.symbols || [];
  } catch (error) {
    console.error('Error fetching symbols:', error);
    return [];
  }
};
