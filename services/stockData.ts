import { Asset } from '../types';

// This acts as our "External API" database
export const ALL_MARKET_SYMBOLS: Asset[] = [
  // --- CRYPTO ---
  { id: 'c1', symbol: 'BTC/USD', name: 'Bitcoin', type: 'CRYPTO', sector: 'Digital Currency' },
  { id: 'c2', symbol: 'ETH/USD', name: 'Ethereum', type: 'CRYPTO', sector: 'Digital Currency' },
  { id: 'c3', symbol: 'SOL/USD', name: 'Solana', type: 'CRYPTO', sector: 'Digital Currency' },
  
  // --- FOREX ---
  { id: 'f1', symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'FOREX', sector: 'Currency' },
  { id: 'f2', symbol: 'GBP/USD', name: 'British Pound / US Dollar', type: 'FOREX', sector: 'Currency' },
  { id: 'f3', symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', type: 'FOREX', sector: 'Currency' },

  // --- BANKING & FINANCE (Expanded Selection) ---
  { id: 'b1', symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'STOCK', sector: 'Financials' },
  { id: 'b2', symbol: 'BAC', name: 'Bank of America Corp', type: 'STOCK', sector: 'Financials' },
  { id: 'b3', symbol: 'WFC', name: 'Wells Fargo & Co', type: 'STOCK', sector: 'Financials' },
  { id: 'b4', symbol: 'C', name: 'Citigroup Inc.', type: 'STOCK', sector: 'Financials' },
  { id: 'b5', symbol: 'GS', name: 'Goldman Sachs Group', type: 'STOCK', sector: 'Financials' },
  { id: 'b6', symbol: 'MS', name: 'Morgan Stanley', type: 'STOCK', sector: 'Financials' },
  { id: 'b7', symbol: 'HSBC', name: 'HSBC Holdings plc', type: 'STOCK', sector: 'Financials' },
  { id: 'b8', symbol: 'RY', name: 'Royal Bank of Canada', type: 'STOCK', sector: 'Financials' },
  { id: 'b9', symbol: 'TD', name: 'Toronto-Dominion Bank', type: 'STOCK', sector: 'Financials' },
  { id: 'b10', symbol: 'UBS', name: 'UBS Group AG', type: 'STOCK', sector: 'Financials' },
  { id: 'b11', symbol: 'DB', name: 'Deutsche Bank AG', type: 'STOCK', sector: 'Financials' },
  { id: 'b12', symbol: 'BCS', name: 'Barclays plc', type: 'STOCK', sector: 'Financials' },
  { id: 'b13', symbol: 'AXP', name: 'American Express', type: 'STOCK', sector: 'Financials' },
  { id: 'b14', symbol: 'BLK', name: 'BlackRock Inc.', type: 'STOCK', sector: 'Financials' },
  { id: 'b15', symbol: 'V', name: 'Visa Inc.', type: 'STOCK', sector: 'Financials' },
  { id: 'b16', symbol: 'MA', name: 'Mastercard Inc.', type: 'STOCK', sector: 'Financials' },
  { id: 'b17', symbol: 'PYPL', name: 'PayPal Holdings', type: 'STOCK', sector: 'Financials' },

  // --- TECH GIANTS ---
  { id: 't1', symbol: 'AAPL', name: 'Apple Inc.', type: 'STOCK', sector: 'Technology' },
  { id: 't2', symbol: 'MSFT', name: 'Microsoft Corp', type: 'STOCK', sector: 'Technology' },
  { id: 't3', symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'STOCK', sector: 'Technology' },
  { id: 't4', symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'STOCK', sector: 'Consumer Cyclical' },
  { id: 't5', symbol: 'NVDA', name: 'NVIDIA Corp', type: 'STOCK', sector: 'Technology' },
  { id: 't6', symbol: 'META', name: 'Meta Platforms', type: 'STOCK', sector: 'Technology' },
  { id: 't7', symbol: 'TSLA', name: 'Tesla Inc.', type: 'STOCK', sector: 'Consumer Cyclical' },
  { id: 't8', symbol: 'NFLX', name: 'Netflix Inc.', type: 'STOCK', sector: 'Communication' },
  { id: 't9', symbol: 'AMD', name: 'Advanced Micro Devices', type: 'STOCK', sector: 'Technology' },
  { id: 't10', symbol: 'INTC', name: 'Intel Corp', type: 'STOCK', sector: 'Technology' },

  // --- ENERGY & INDUSTRIAL ---
  { id: 'e1', symbol: 'XOM', name: 'Exxon Mobil Corp', type: 'STOCK', sector: 'Energy' },
  { id: 'e2', symbol: 'CVX', name: 'Chevron Corp', type: 'STOCK', sector: 'Energy' },
  { id: 'e3', symbol: 'SHEL', name: 'Shell plc', type: 'STOCK', sector: 'Energy' },
  { id: 'i1', symbol: 'BA', name: 'Boeing Co', type: 'STOCK', sector: 'Industrials' },
  { id: 'i2', symbol: 'GE', name: 'General Electric', type: 'STOCK', sector: 'Industrials' },
  { id: 'i3', symbol: 'CAT', name: 'Caterpillar Inc.', type: 'STOCK', sector: 'Industrials' },

  // --- HEALTHCARE ---
  { id: 'h1', symbol: 'JNJ', name: 'Johnson & Johnson', type: 'STOCK', sector: 'Healthcare' },
  { id: 'h2', symbol: 'PFE', name: 'Pfizer Inc.', type: 'STOCK', sector: 'Healthcare' },
  { id: 'h3', symbol: 'UNH', name: 'UnitedHealth Group', type: 'STOCK', sector: 'Healthcare' },
];