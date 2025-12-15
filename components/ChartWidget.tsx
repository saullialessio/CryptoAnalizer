import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { ChartDataPoint } from '../types';

interface ChartWidgetProps {
  data: ChartDataPoint[];
  symbol: string;
  color?: string;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ data, symbol, color = "#3b82f6" }) => {
  const isPositive = data.length > 0 && data[data.length - 1].price >= data[0].price;
  const strokeColor = isPositive ? '#10b981' : '#ef4444';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`colorGradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af" 
            fontSize={11} 
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="#9ca3af" 
            fontSize={11} 
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(value) => value.toLocaleString()}
            width={60}
            orientation="right"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              borderColor: '#374151', 
              color: '#f3f4f6',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: '#e5e7eb' }}
            labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
            formatter={(value: number) => [value.toLocaleString(undefined, { minimumFractionDigits: 2 }), 'Price']}
          />
          <ReferenceLine y={data[0]?.price} stroke="#6b7280" strokeDasharray="3 3" opacity={0.5} label={{ value: 'Open', position: 'insideLeft', fill: '#6b7280', fontSize: 10 }} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={strokeColor} 
            strokeWidth={2}
            fill={`url(#colorGradient-${symbol})`} 
            animationDuration={500}
            isAnimationActive={false} // Disable for smoother realtime updates
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWidget;
