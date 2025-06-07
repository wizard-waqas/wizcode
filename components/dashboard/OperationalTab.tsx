import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data - in a real app, this would come from SheetDB
const clientData = [
  { month: '2024-12', clients: 3 },
  { month: '2025-01', clients: 4 },
  { month: '2025-02', clients: 6 },
  { month: '2025-03', clients: 19 },
  { month: '2025-04', clients: 16 },
  { month: '2025-05', clients: 21 },
  { month: '2025-06', clients: 8 },
];

const serviceData = [
  { month: '2024-12', packageA: 2, packageB: 1, packageC: 0 },
  { month: '2025-01', packageA: 2, packageB: 2, packageC: 0 },
  { month: '2025-02', packageA: 3, packageB: 2, packageC: 1 },
  { month: '2025-03', packageA: 7, packageB: 10, packageC: 2 },
  { month: '2025-04', packageA: 5, packageB: 8, packageC: 3 },
  { month: '2025-05', packageA: 6, packageB: 12, packageC: 3 },
  { month: '2025-06', packageA: 3, packageB: 4, packageC: 1 },
];

const hourlyRateData = [
  { month: '2024-12', rate: 20.83 },
  { month: '2025-01', rate: -13.83 },
  { month: '2025-02', rate: 11.67 },
  { month: '2025-03', rate: 81.32 },
  { month: '2025-04', rate: 68.75 },
  { month: '2025-05', rate: 88.27 },
  { month: '2025-06', rate: 108.29 },
];

// Format month labels
const formatMonth = (month: string) => {
  const date = new Date(month);
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};

interface OperationalTabProps {
  darkMode: boolean;
}

const OperationalTab: React.FC<OperationalTabProps> = ({ darkMode }) => {
  const textColor = darkMode ? '#E5E7EB' : '#374151';
  const gridColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Client Growth Chart */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Client Growth</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={clientData}
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
                labelFormatter={formatMonth}
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Legend />
              <Bar 
                dataKey="clients" 
                name="Number of Clients"
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Popularity Chart */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Service Popularity</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={serviceData}
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
                labelFormatter={formatMonth}
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Legend />
              <Bar 
                dataKey="packageA" 
                name="Package A (front only)"
                fill="#3B82F6" 
                stackId="a"
              />
              <Bar 
                dataKey="packageB" 
                name="Package B (front + rear)"
                fill="#10B981" 
                stackId="a"
              />
              <Bar 
                dataKey="packageC" 
                name="Package C (full vehicle)"
                fill="#F59E0B" 
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Rate Chart */}
      <div className={`col-span-1 lg:col-span-2 p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Hourly Rate Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={hourlyRateData}
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
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Hourly Rate']}
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
                dataKey="rate" 
                name="Hourly Rate"
                stroke="#8B5CF6" 
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#8B5CF6' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OperationalTab;

