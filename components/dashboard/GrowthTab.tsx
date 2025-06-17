import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface GrowthTabProps {
  data: any[];
  darkMode: boolean;
}

export default function GrowthTab({ data, darkMode }: GrowthTabProps) {
  // Calculate month-over-month growth
  const growthData = data.map((current, index) => {
    if (index === 0) {
      return {
        ...current,
        revenueGrowth: 0,
        clientGrowth: 0,
      };
    }

    const previous = data[index - 1];
    const revenueGrowth = previous.revenue === 0 ? 0 : ((current.revenue - previous.revenue) / previous.revenue) * 100;
    const clientGrowth = previous.clients === 0 ? 0 : ((current.clients - previous.clients) / previous.clients) * 100;

    return {
      ...current,
      revenueGrowth: parseFloat(revenueGrowth.toFixed(1)),
      clientGrowth: parseFloat(clientGrowth.toFixed(1)),
    };
  });

  return (
    <div className="space-y-8">
      {/* Revenue Growth Rate */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Month-over-Month Revenue Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
                formatter={(value: any) => [`${value}%`, 'Revenue Growth']}
              />
              <Bar 
                dataKey="revenueGrowth" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Client Growth Rate */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Month-over-Month Client Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
                formatter={(value: any) => [`${value}%`, 'Client Growth']}
              />
              <Bar 
                dataKey="clientGrowth" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Combined Growth Trends */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Combined Growth Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
                formatter={(value: any) => [`${value}%`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="revenueGrowth" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Revenue Growth"
              />
              <Line 
                type="monotone" 
                dataKey="clientGrowth" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Client Growth"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

