import React, { useState, useEffect } from 'react';
import { Moon, Sun, Upload } from 'lucide-react';
import FinancialTab from '../../components/dashboard/FinancialTab';
import OperationalTab from '../../components/dashboard/OperationalTab';
import GrowthTab from '../../components/dashboard/GrowthTab';
import SummaryTab from '../../components/dashboard/SummaryTab';
import FileUploadModal from '../../components/dashboard/FileUploadModal';

export default function FinancesDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('financial');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Apply dark mode class to the document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const tabs = [
    { id: 'financial', label: 'Financial', count: '1' },
    { id: 'operational', label: 'Operational', count: '2' },
    { id: 'growth', label: 'Growth', count: '3' },
    { id: 'summary', label: 'Summary', count: '4' }
  ];

  const currentMonthData = {
    expenses: 780,
    revenue: 2100,
    profit: 1320,
    clients: 8,
    month: 'June 2025',
    expensesChange: -68.2,
    revenueChange: -51.2,
    profitChange: -30.5,
    clientsChange: -61.9
  };

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
              December 2024 - June 2025
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
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <Upload className="h-4 w-4" />
              Update Spreadsheet
            </button>
          </div>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Current Month Expenses"
            value={`$${currentMonthData.expenses.toLocaleString()}`}
            subtitle={currentMonthData.month}
            change={currentMonthData.expensesChange}
            darkMode={darkMode}
          />
          <MetricCard
            title="Current Month Revenue"
            value={`$${currentMonthData.revenue.toLocaleString()}`}
            subtitle={currentMonthData.month}
            change={currentMonthData.revenueChange}
            darkMode={darkMode}
          />
          <MetricCard
            title="Current Month Profit"
            value={`$${currentMonthData.profit.toLocaleString()}`}
            subtitle={currentMonthData.month}
            change={currentMonthData.profitChange}
            darkMode={darkMode}
          />
          <MetricCard
            title="Current Month Clients"
            value={currentMonthData.clients}
            subtitle={currentMonthData.month}
            change={currentMonthData.clientsChange}
            darkMode={darkMode}
          />
        </div>

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
          {activeTab === 'financial' && <FinancialTab darkMode={darkMode} />}
          {activeTab === 'operational' && <OperationalTab darkMode={darkMode} />}
          {activeTab === 'growth' && <GrowthTab darkMode={darkMode} />}
          {activeTab === 'summary' && <SummaryTab darkMode={darkMode} />}
        </div>

        {/* File Upload Modal */}
        {showUploadModal && (
          <FileUploadModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            darkMode={darkMode}
          />
        )}
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
          {Math.abs(change).toFixed(1)}% from May
        </span>
      </div>
    </div>
  );
}

