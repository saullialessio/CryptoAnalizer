import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-lg shadow-sm flex flex-col ${className}`}>
      {(title || action) && (
        <div className="px-4 py-3 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 rounded-t-lg">
          {title && <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-4 flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default Card;
