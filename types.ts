export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
  email: string;
  avatarUrl?: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  timestamp: number;
}

export interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
  ma7?: number;
  ma25?: number;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'STOCK' | 'CRYPTO' | 'FOREX';
  sector?: string;
  holdings?: number;
}

export interface Alert {
  id: string;
  symbol: string;
  condition: 'ABOVE' | 'BELOW';
  price: number;
  active: boolean;
}

export type TimeFrame = '1M' | '15M' | '1H' | '4H' | '1D';

export interface DashboardConfig {
  layout: string[]; // Mocking layout IDs
  widgets: string[];
}