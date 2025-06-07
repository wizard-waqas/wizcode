import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data - in a real app, this would come from SheetDB
const financialData = [
  { month: '2024-12', revenue: 1000, expenses: 1246.5, earnings: -246.5 },
  { month: '2025-01', revenue: 1200, expenses: 2530, earnings: -1330 },
  { month: '2025-02', revenue: 140, expenses: 175, earnings: -35 },
  { month: '2025-03', revenue: 3995, expenses: 1115, earnings: 2880 },
  { month: '2025-04', revenue: 3200, expenses: 1100, earnings: 2100 },
  { month: '2025-05', revenue: 4305, expenses: 1200, earnings: 3105 },
  { month: '2025-06', revenue: 2100, expenses: 780, earnings: 1320 },
];

const profitMarginData = [
  { month: '2024-12', margin: -24.65 },
  { month: '2025-01', margin: -110.83 },
  { month: '2025-02', margin: -25.0 },
  { month: '2025-03', margin: 72.09 },
  { month: '2025-04', margin: 65.63 },
  { month: '2025-05', margin: 72.19 },
  { month: '2025-06', margin: 62.86 },
];

const expenseBreakdown = [
  { name: 'Equipment', value: 40, color: '#3B82F6' },
  { name: 'Marketing', value: 27, color: '#10B981' },
  { name: 'Supplies', value: 20, color: '#F59E0B' },
  { name: 'Other', value: 13, color: '#8B5CF6' },
];

// Format month labels
const formatMonth = (month: string) => {
  const date = new Date(month);
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};

interface FinancialTabProps {
  darkMode: boolean;
}

const FinancialTab: React.FC<FinancialTabProps> = ({ darkMode }) => {
  const textColor = darkMode ? '#E5E7EB' : '#374151';
  const gridColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue, Expenses, and Earnings Trend */}
      <div className={`col-span-1 lg:col-span-2 p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Revenue, Expenses, and Earnings Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={financialData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="month" 
                tickFormatter={formatMonth} 
                stroke={textColor}
                fontSize={12}
              />
              <YAxis 
                stroke={textColor}
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={formatMonth}
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue"
                stroke="#3B82F6" 
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#3B82F6' }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                name="Total Expenses"
                stroke="#10B981" 
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#10B981' }}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                name="Earnings"
                stroke="#F59E0B" 
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#F59E0B' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profit Margin Trend */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Profit Margin Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitMarginData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="month" 
                tickFormatter={formatMonth} 
                stroke={textColor}
                fontSize={12}
              />
              <YAxis 
                stroke={textColor}
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Profit Margin']}
                labelFormatter={formatMonth}
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Line 
                type="monotone" 
                dataKey="margin" 
                name="Profit Margin"
                stroke="#8B5CF6" 
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#8B5CF6' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, '']}
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialTab;

