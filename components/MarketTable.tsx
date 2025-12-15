import React from 'react';
import { MarketData } from '../types';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

interface MarketTableProps {
  data: MarketData[];
  onSelect: (symbol: string) => void;
  selectedSymbol: string;
}

const MarketTable: React.FC<MarketTableProps> = ({ data, onSelect, selectedSymbol }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-400 uppercase bg-slate-800/50 border-b border-slate-700">
          <tr>
            <th className="px-4 py-3 font-medium">Asset</th>
            <th className="px-4 py-3 font-medium text-right">Price</th>
            <th className="px-4 py-3 font-medium text-right">Change</th>
            <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">High</th>
            <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Low</th>
            <th className="px-4 py-3 font-medium text-right hidden md:table-cell">Volume</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {data.map((item) => {
            const isUp = item.change >= 0;
            const isSelected = item.symbol === selectedSymbol;
            
            return (
              <tr 
                key={item.symbol} 
                onClick={() => onSelect(item.symbol)}
                className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-slate-800/80 border-l-2 border-blue-500' : ''}`}
              >
                <td className="px-4 py-3 font-medium text-white flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${isUp ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  <span>{item.symbol}</span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-200">
                  {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-medium ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  <div className="flex items-center justify-end space-x-1">
                    {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{Math.abs(item.changePercent).toFixed(2)}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-slate-400 hidden sm:table-cell font-mono">
                  {item.high.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-slate-400 hidden sm:table-cell font-mono">
                  {item.low.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-slate-500 hidden md:table-cell font-mono">
                  {(item.volume / 1000).toFixed(1)}K
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-slate-500 hover:text-white p-1">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
