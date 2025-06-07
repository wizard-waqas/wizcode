import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data - in a real app, this would come from SheetDB
const growthData = [
  { month: '2024-12', revenue: 1000, clients: 3, revenueGrowth: 0, clientGrowth: 0 },
  { month: '2025-01', revenue: 1200, clients: 4, revenueGrowth: 20, clientGrowth: 33.3 },
  { month: '2025-02', revenue: 140, clients: 6, revenueGrowth: -88.3, clientGrowth: 50 },
  { month: '2025-03', revenue: 3995, clients: 19, revenueGrowth: 2753.6, clientGrowth: 216.7 },
  { month: '2025-04', revenue: 3200, clients: 16, revenueGrowth: -19.9, clientGrowth: -15.8 },
  { month: '2025-05', revenue: 4305, clients: 21, revenueGrowth: 34.5, clientGrowth: 31.3 },
  { month: '2025-06', revenue: 2100, clients: 8, revenueGrowth: -51.2, clientGrowth: -61.9 },
];

const cumulativeData = [
  { month: '2024-12', revenue: 1000, clients: 3 },
  { month: '2025-01', revenue: 2200, clients: 7 },
  { month: '2025-02', revenue: 2340, clients: 13 },
  { month: '2025-03', revenue: 6335, clients: 32 },
  { month: '2025-04', revenue: 9535, clients: 48 },
  { month: '2025-05', revenue: 13840, clients: 69 },
  { month: '2025-06', revenue: 15940, clients: 77 },
];

// Format month labels
const formatMonth = (month: string) => {
  const date = new Date(month);
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};

interface GrowthTabProps {
  darkMode: boolean;
}

const GrowthTab: React.FC<GrowthTabProps> = ({ darkMode }) => {
  const textColor = darkMode ? '#E5E7EB' : '#374151';
  const gridColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Month-over-Month Growth Chart */}
      <div className={`col-span-1 lg:col-span-2 p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Month-over-Month Growth</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={growthData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
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
                formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
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
                dataKey="revenueGrowth" 
                name="Revenue Growth"
                stroke="#3B82F6" 
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#3B82F6' }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="clientGrowth" 
                name="Client Growth"
                stroke="#10B981" 
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cumulative Revenue Chart */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Cumulative Revenue</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cumulativeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
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
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Revenue']}
                labelFormatter={formatMonth}
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                name="Cumulative Revenue"
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cumulative Clients Chart */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Cumulative Clients</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cumulativeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
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
              />
              <Tooltip 
                formatter={(value: number) => [value, 'Total Clients']}
                labelFormatter={formatMonth}
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Area 
                type="monotone" 
                dataKey="clients" 
                name="Cumulative Clients"
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GrowthTab;

