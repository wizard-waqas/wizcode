import React from 'react';
import type { MetricCardProps } from '../../types/dashboard';

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  change, 
  format = 'number',
  className = '' 
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(val);
      case 'percentage':
        return `${val}%`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const getChangeColor = (changeValue?: number): string => {
    if (changeValue === undefined || changeValue === 0) return 'text-gray-400';
    return changeValue > 0 ? 'text-green-400' : 'text-red-400';
  };

  const getChangeSymbol = (changeValue?: number): string => {
    if (changeValue === undefined || changeValue === 0) return '';
    return changeValue > 0 ? '↗' : '↘';
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-white">
            {formatValue(value)}
          </span>
          {change !== undefined && (
            <span className={`text-sm font-medium ${getChangeColor(change)}`}>
              {getChangeSymbol(change)}{Math.abs(change)}%
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;

