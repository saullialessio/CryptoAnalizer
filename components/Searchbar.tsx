import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Loader2 } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { searchAssetsApi } from '../services/marketService';
import { Asset } from '../types';

const Searchbar: React.FC = () => {
  const { setSelectedAsset } = useDashboard();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 1) {
        setIsLoading(true);
        setIsOpen(true);
        try {
          const data = await searchAssetsApi(query);
          setResults(data);
        } catch (error) {
          console.error("API Error", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (symbol: string) => {
    setSelectedAsset(symbol);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if(e.target.value.length === 0) setIsOpen(false);
          }}
          onFocus={() => {
            if (query.length > 1 || results.length > 0) setIsOpen(true);
          }}
          placeholder="Search 100+ global assets (e.g. PayPal, Visa)..." 
          className="bg-slate-800 text-slate-200 text-sm rounded-full pl-10 pr-10 py-2 w-full border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm placeholder-slate-500"
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
             <Loader2 className="animate-spin text-blue-500" size={14} />
          </div>
        )}

        {!isLoading && query && (
          <button 
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden z-50 animate-fade-in">
          {results.length > 0 ? (
            <>
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/50 flex justify-between">
                <span>Search Results</span>
                <span className="text-[10px] bg-blue-900/30 text-blue-400 px-1.5 rounded">API CONNECTED</span>
              </div>
              <ul>
                {results.map(asset => (
                  <li key={asset.id}>
                    <button 
                      onClick={() => handleSelect(asset.symbol)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-700/50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-xs font-bold
                          ${asset.type === 'CRYPTO' ? 'bg-orange-500/20 text-orange-400' : 
                            asset.type === 'FOREX' ? 'bg-green-500/20 text-green-400' : 
                            'bg-blue-500/20 text-blue-400'}`}>
                          {asset.symbol.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{asset.symbol}</div>
                          <div className="text-xs text-slate-500">{asset.name}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-xs text-slate-400 font-medium">
                            {asset.sector || asset.type}
                         </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
             !isLoading && query.length > 1 && (
               <div className="px-4 py-4 text-center text-slate-500 text-sm">
                 No assets found matching "{query}"
               </div>
             )
          )}
          
          {/* Default State / Popular Banking Categories */}
          {(!query || results.length === 0) && !isLoading && (
            <div className="border-t border-slate-700">
               <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/50 flex items-center">
                <TrendingUp size={12} className="mr-1.5" /> Sector Quick Links
               </div>
               <div className="p-2 flex flex-wrap gap-2">
                 {[
                   {l: 'Banking', q: 'bank'}, 
                   {l: 'Tech', q: 'inc'}, 
                   {l: 'Crypto', q: 'usd'}, 
                   {l: 'Forex', q: 'eur'}
                 ].map(item => (
                   <button 
                    key={item.l}
                    onClick={() => {
                        setQuery(item.q);
                    }}
                    className="text-xs bg-slate-700/50 hover:bg-blue-600/20 hover:text-blue-400 text-slate-300 py-1.5 px-3 rounded-full transition-colors border border-slate-700 hover:border-blue-500/30"
                   >
                     {item.l}
                   </button>
                 ))}
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;