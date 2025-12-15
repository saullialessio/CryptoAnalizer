import React, { useState, useEffect } from 'react';
import { generateMarketSnapshot, generateHistoricalData } from '../services/marketService';
import { MarketData, ChartDataPoint } from '../types';
import Card from '../components/Card';
import ChartWidget from '../components/ChartWidget';
import MarketTable from '../components/MarketTable';
import StatCard from '../components/StatCard';
import { DollarSign, Activity, Layers, Clock } from 'lucide-react';
import { MOCK_ASSETS } from '../constants';
import { useDashboard } from '../context/DashboardContext';
import { ALL_MARKET_SYMBOLS } from '../services/stockData';

const Dashboard: React.FC = () => {
  const { selectedAsset, setSelectedAsset } = useDashboard();
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<string>('1H');

  // We need to track which symbols to fetch data for. 
  // This includes the User's Watchlist (MOCK_ASSETS) AND the currently selected asset (if it's not in the watchlist)
  const getTrackedSymbols = () => {
    const symbols = new Set(MOCK_ASSETS.map(a => a.symbol));
    symbols.add(selectedAsset);
    return Array.from(symbols);
  };

  // Simulate WebSocket connection
  useEffect(() => {
    const trackedSymbols = getTrackedSymbols();
    
    // Initial fetch
    setMarketData(generateMarketSnapshot(trackedSymbols));

    // Interval fetch (Simulating WebSocket heartbeat)
    const interval = setInterval(() => {
      // Re-evaluate tracked symbols in case selectedAsset changed
      const currentTracked = getTrackedSymbols();
      setMarketData(generateMarketSnapshot(currentTracked));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [selectedAsset]); // Re-subscribe when selected asset changes

  // Update chart when asset changes or "live" update happens
  useEffect(() => {
    // Generate initial history
    setChartData(generateHistoricalData(selectedAsset));
  }, [selectedAsset]);

  // Simulate live chart updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const currentPriceData = marketData.find(m => m.symbol === selectedAsset);
        if (!currentPriceData) return prev;

        const newPoint: ChartDataPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          price: currentPriceData.price,
          volume: currentPriceData.volume / 1000 // scaled
        };
        
        // Keep last 50 points
        return [...prev.slice(1), newPoint];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [marketData, selectedAsset]);

  // Calculate Portfolio Value
  const portfolioValue = MOCK_ASSETS.reduce((acc, asset) => {
    const price = marketData.find(m => m.symbol === asset.symbol)?.price || 0;
    return acc + (price * (asset.holdings || 0));
  }, 0);

  const selectedAssetData = marketData.find(m => m.symbol === selectedAsset);
  const assetInfo = ALL_MARKET_SYMBOLS.find(a => a.symbol === selectedAsset);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Portfolio Value" 
          value={`$${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          trend={1.2}
          icon={<DollarSign size={18} />}
        />
        <StatCard 
          label="24h Volume" 
          value="$42.5M" 
          trend={-5.4}
          icon={<Activity size={18} />}
        />
        <StatCard 
          label="Active Positions" 
          value={MOCK_ASSETS.filter(a => a.holdings).length.toString()} 
          icon={<Layers size={18} />}
        />
        <StatCard 
          label="Market Status" 
          value="OPEN" 
          icon={<Clock size={18} />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] lg:h-[500px]">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 h-full">
          <Card 
            title={`${selectedAsset} Analysis`} 
            className="h-full"
            action={
              <div className="flex space-x-2">
                {['15M', '1H', '4H', '1D'].map(tf => (
                  <button 
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${timeframe === tf ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            }
          >
            <div className="flex flex-col h-full">
              <div className="mb-4 flex items-end space-x-3 px-2">
                {selectedAssetData ? (
                  <>
                    <span className="text-3xl font-bold text-white font-mono">
                      {selectedAssetData.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`text-sm font-medium mb-1.5 ${selectedAssetData.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedAssetData.change > 0 ? '+' : ''}{selectedAssetData.change} ({selectedAssetData.changePercent}%)
                    </span>
                  </>
                ) : (
                  <span className="text-xl text-slate-500">Loading data...</span>
                )}
                
                <div className="flex items-center space-x-2 ml-2">
                   <span className="text-xs text-slate-300 bg-slate-700/50 px-2 py-0.5 rounded-full border border-slate-600">
                      {assetInfo?.name || selectedAsset}
                   </span>
                   {assetInfo?.sector && (
                     <span className="text-xs text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded-full border border-blue-800/30">
                        {assetInfo.sector}
                     </span>
                   )}
                </div>
              </div>
              <div className="flex-1 w-full min-h-0">
                <ChartWidget data={chartData} symbol={selectedAsset} />
              </div>
            </div>
          </Card>
        </div>

        {/* Watchlist Table */}
        <div className="lg:col-span-1 h-full">
          <Card title="Your Watchlist" className="h-full">
            <div className="h-full overflow-y-auto -mx-4">
              <MarketTable 
                data={marketData.filter(m => MOCK_ASSETS.some(a => a.symbol === m.symbol))} 
                onSelect={setSelectedAsset} 
                selectedSymbol={selectedAsset}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity / Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Alerts">
           <div className="space-y-3">
             <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-medium text-slate-200">JPM crossed above 205.00</span>
                </div>
                <span className="text-xs text-slate-500">2 min ago</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-medium text-slate-200">BTC/USD crossed above 68,000</span>
                </div>
                <span className="text-xs text-slate-500">12 min ago</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="font-medium text-slate-200">AAPL dropped below 172.00</span>
                </div>
                <span className="text-xs text-slate-500">15 min ago</span>
             </div>
           </div>
        </Card>
        
        <Card title="Quick Trade">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded transition-colors">Buy</button>
              <button className="flex-1 bg-red-600 hover:bg-red-500 text-white font-medium py-2 rounded transition-colors">Sell</button>
            </div>
            <div className="text-center text-xs text-slate-500 mt-2">
              Trading {selectedAsset} at market price.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;