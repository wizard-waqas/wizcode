import React, { useState, useEffect } from 'react';
import { Moon, Sun, RefreshCw } from 'lucide-react';
import FinancialTab from '../../components/dashboard/FinancialTab';
import OperationalTab from '../../components/dashboard/OperationalTab';
import GrowthTab from '../../components/dashboard/GrowthTab';
import SummaryTab from '../../components/dashboard/SummaryTab';

interface DashboardData {
  financialData: any[];
  currentMonth: {
    expenses: number;
    revenue: number;
    profit: number;
    clients: number;
    month: string;
    expensesChange: number;
    revenueChange: number;
    profitChange: number;
    clientsChange: number;
  };
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    totalEarnings: number;
    lifetimeProfitMargin: number;
    peakRevenueMonth: string;
    peakRevenue: number;
    totalMonths: number;
  };
  lastUpdated: string;
}

export default function FinancesDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('financial');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Apply dark mode class to the document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch data from Google Sheets API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/dashboard-data');
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
        setLastUpdated(new Date(result.data.lastUpdated));
      } else {
        setError(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to connect to Google Sheets');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Refresh data manually
  const handleRefresh = () => {
    fetchDashboardData();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const tabs = [
    { id: 'financial', label: 'Financial', count: '1' },
    { id: 'operational', label: 'Operational', count: '2' },
    { id: 'growth', label: 'Growth', count: '3' },
    { id: 'summary', label: 'Summary', count: '4' }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading dashboard data from Google Sheets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { currentMonth, summary } = dashboardData || {};

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Business Growth Dashboard</h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Powered by Google Sheets
              {lastUpdated && (
                <span className="ml-2 text-sm">
                  • Last updated: {lastUpdated.toLocaleString()}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors font-medium ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Refresh data from Google Sheets"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </header>

        {/* Metric Cards */}
        {currentMonth && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Current Month Expenses"
              value={`$${currentMonth.expenses?.toLocaleString() || '0'}`}
              subtitle={currentMonth.month || 'Current Month'}
              change={currentMonth.expensesChange || 0}
              darkMode={darkMode}
            />
            <MetricCard
              title="Current Month Revenue"
              value={`$${currentMonth.revenue?.toLocaleString() || '0'}`}
              subtitle={currentMonth.month || 'Current Month'}
              change={currentMonth.revenueChange || 0}
              darkMode={darkMode}
            />
            <MetricCard
              title="Current Month Profit"
              value={`$${currentMonth.profit?.toLocaleString() || '0'}`}
              subtitle={currentMonth.month || 'Current Month'}
              change={currentMonth.profitChange || 0}
              darkMode={darkMode}
            />
            <MetricCard
              title="Current Month Clients"
              value={currentMonth.clients?.toString() || '0'}
              subtitle={currentMonth.month || 'Current Month'}
              change={currentMonth.clientsChange || 0}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'financial' && (
            <FinancialTab 
              data={dashboardData?.financialData || []} 
              darkMode={darkMode} 
            />
          )}
          {activeTab === 'operational' && (
            <OperationalTab 
              data={dashboardData?.financialData || []} 
              darkMode={darkMode} 
            />
          )}
          {activeTab === 'growth' && (
            <GrowthTab 
              data={dashboardData?.financialData || []} 
              darkMode={darkMode} 
            />
          )}
          {activeTab === 'summary' && (
            <SummaryTab 
              data={dashboardData?.financialData || []} 
              summary={dashboardData?.summary || {}}
              darkMode={darkMode} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  change: number;
  darkMode: boolean;
}

function MetricCard({ title, value, subtitle, change, darkMode }: MetricCardProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className={`p-6 rounded-xl transition-colors ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <h3 className={`text-sm font-medium mb-2 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {title}
      </h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {subtitle}
        </span>
        <span className={`text-sm font-medium flex items-center gap-1 ${
          isPositive 
            ? 'text-green-500' 
            : isNegative 
              ? 'text-red-500' 
              : darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {isPositive && '↗'}
          {isNegative && '↘'}
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

