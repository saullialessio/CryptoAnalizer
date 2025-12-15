import { MarketData, ChartDataPoint, Asset } from '../types';
import { SEED_PRICES } from '../constants';
import { ALL_MARKET_SYMBOLS } from './stockData';

// "Database" state for the simulation
const priceCache: Record<string, number> = { ...SEED_PRICES };

// Helper to generate realistic random walk
const randomWalk = (price: number, volatility: number = 0.002) => {
  const change = price * volatility * (Math.random() - 0.5);
  return Number((price + change).toFixed(price > 1000 ? 2 : 4));
};

const getOrGeneratePrice = (symbol: string): number => {
  if (priceCache[symbol]) return priceCache[symbol];
  
  // If we don't have a seed price (e.g. searched for a new stock), generate a realistic one based on hash
  const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  let basePrice = (hash % 500) + 20; // Random price between 20 and 520
  
  if (symbol.includes('USD') && !symbol.includes('BTC') && !symbol.includes('ETH')) {
     basePrice = 1.05 + (Math.random() * 0.1); // Forex
  }
  
  priceCache[symbol] = basePrice;
  return basePrice;
};

// --- SIMULATED API METHODS ---

// 1. Search API
export const searchAssetsApi = async (query: string): Promise<Asset[]> => {
  // Simulate network latency (200ms)
  await new Promise(resolve => setTimeout(resolve, 200));

  if (!query) return [];
  const lowerQ = query.toLowerCase();
  
  return ALL_MARKET_SYMBOLS.filter(asset => 
    asset.symbol.toLowerCase().includes(lowerQ) || 
    asset.name.toLowerCase().includes(lowerQ) ||
    (asset.sector && asset.sector.toLowerCase().includes(lowerQ))
  ).slice(0, 10);
};

// 2. Market Data Stream
// Accepts a list of symbols to return data for (Watchlist + Selected Asset)
export const generateMarketSnapshot = (symbols: string[]): MarketData[] => {
  return symbols.map(symbol => {
    const oldPrice = getOrGeneratePrice(symbol);
    const newPrice = randomWalk(oldPrice);
    priceCache[symbol] = newPrice; // Update cache
    
    // Calculate a "daily" change based on the seed price vs current random walk
    // In a real app this is (Current - Open)
    // Here we approximate drift from our internal cache seed
    const volatility = 0.02; // 2% daily range roughly
    const startOfDay = oldPrice * (1 - (Math.random() * volatility - (volatility/2)));
    
    const change = newPrice - startOfDay;
    const changePercent = (change / startOfDay) * 100;

    return {
      symbol: symbol,
      price: newPrice,
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
      high: Math.max(newPrice, startOfDay) * 1.005,
      low: Math.min(newPrice, startOfDay) * 0.995,
      timestamp: Date.now(),
    };
  });
};

// 3. Historical Data API
export const generateHistoricalData = (symbol: string, points: number = 50): ChartDataPoint[] => {
  let price = getOrGeneratePrice(symbol);
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = points; i > 0; i--) {
    price = randomWalk(price, 0.01);
    const time = new Date(now.getTime() - i * 60000); // Minutes ago
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: price,
      volume: Math.floor(Math.random() * 50000),
      ma7: price * (1 + (Math.random() * 0.02 - 0.01)),
      ma25: price * (1 + (Math.random() * 0.04 - 0.02)),
    });
  }
  return data;
};