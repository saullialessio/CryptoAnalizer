import { Asset } from './types';
import { ALL_MARKET_SYMBOLS } from './services/stockData';

export const APP_NAME = "FinDash";

// We define a "Watchlist" or "Portfolio" subset for the user initially
// This filters our big database to just the ones the user "owns" or watches by default
const DEFAULT_SYMBOLS = ['BTC/USD', 'ETH/USD', 'AAPL', 'TSLA', 'EUR/USD', 'NVDA', 'JPM', 'BAC'];

export const MOCK_ASSETS: Asset[] = ALL_MARKET_SYMBOLS.filter(a => DEFAULT_SYMBOLS.includes(a.symbol)).map(a => {
  // Add some fake holdings for the portfolio view
  if (a.symbol === 'BTC/USD') return { ...a, holdings: 0.45 };
  if (a.symbol === 'ETH/USD') return { ...a, holdings: 12.5 };
  if (a.symbol === 'AAPL') return { ...a, holdings: 150 };
  if (a.symbol === 'TSLA') return { ...a, holdings: 45 };
  if (a.symbol === 'JPM') return { ...a, holdings: 50 };
  if (a.symbol === 'BAC') return { ...a, holdings: 200 };
  return a;
});

export const INITIAL_ALERTS = [
  { id: '1', symbol: 'BTC/USD', condition: 'ABOVE', price: 68000, active: true },
  { id: '2', symbol: 'AAPL', condition: 'BELOW', price: 170, active: true },
  { id: '3', symbol: 'JPM', condition: 'ABOVE', price: 205, active: true },
];

// Initial Base Prices (Seed data for the random walk generator)
// If a symbol isn't here, the service will generate a random start price
export const SEED_PRICES: Record<string, number> = {
  'BTC/USD': 67540.20,
  'ETH/USD': 3240.15,
  'SOL/USD': 145.20,
  'AAPL': 174.30,
  'TSLA': 182.50,
  'EUR/USD': 1.0845,
  'NVDA': 890.12,
  'JPM': 198.50,
  'BAC': 37.80,
  'WFC': 58.20,
  'C': 63.45,
  'GS': 402.10,
  'MS': 94.30,
  'DB': 15.60,
  'HSBC': 39.50,
  'UBS': 28.10,
  'MSFT': 420.55,
  'GOOGL': 173.90,
  'AMZN': 180.20
};