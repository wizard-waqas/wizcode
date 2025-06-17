import React from 'react';

interface SummaryTabProps {
  data: any[];
  summary: any;
  darkMode: boolean;
}

export default function SummaryTab({ data, summary, darkMode }: SummaryTabProps) {
  const {
    totalRevenue = 0,
    totalExpenses = 0,
    totalEarnings = 0,
    lifetimeProfitMargin = 0,
    peakRevenueMonth = 'N/A',
    peakRevenue = 0,
    totalMonths = 0
  } = summary;

  const insights = [
    {
      title: "Financial Performance",
      items: [
        `Total Revenue: $${totalRevenue.toLocaleString()}`,
        `Total Expenses: $${totalExpenses.toLocaleString()}`,
        `Total Earnings: $${totalEarnings.toLocaleString()}`,
        `Lifetime Profit Margin: ${lifetimeProfitMargin}%`
      ]
    },
    {
      title: "Peak Performance",
      items: [
        `Best Revenue Month: ${peakRevenueMonth}`,
        `Peak Revenue: $${peakRevenue.toLocaleString()}`,
        `Total Months Tracked: ${totalMonths}`
      ]
    },
    {
      title: "Business Insights",
      items: [
        data.length > 0 && data[data.length - 1]?.revenue > data[0]?.revenue 
          ? "📈 Revenue trend is positive overall"
          : "📉 Revenue needs attention",
        lifetimeProfitMargin > 30 
          ? "💰 Healthy profit margins maintained"
          : "⚠️ Profit margins could be improved",
        data.some(row => row.clients > 15) 
          ? "👥 Successfully scaled client base"
          : "🎯 Focus on client acquisition",
        data.length >= 6 
          ? "📊 Sufficient data for trend analysis"
          : "📈 Continue tracking for better insights"
      ]
    },
    {
      title: "Recommendations",
      items: [
        lifetimeProfitMargin < 20 
          ? "🔍 Review expense management strategies"
          : "✅ Maintain current cost control",
        data.some(row => row.revenue > 4000) 
          ? "🚀 Capitalize on high-revenue periods"
          : "📈 Explore revenue growth opportunities",
        "📱 Consider automating data collection",
        "📊 Set up monthly performance reviews"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics Summary */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h3 className="text-xl font-semibold mb-6">Business Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-2xl font-bold text-blue-500">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Revenue
            </div>
          </div>
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-2xl font-bold text-red-500">
              ${totalExpenses.toLocaleString()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Expenses
            </div>
          </div>
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className={`text-2xl font-bold ${totalEarnings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${totalEarnings.toLocaleString()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Earnings
            </div>
          </div>
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className={`text-2xl font-bold ${lifetimeProfitMargin >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {lifetimeProfitMargin}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Profit Margin
            </div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((section, index) => (
          <div key={index} className={`p-6 rounded-xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Data Source Info */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h4 className="text-lg font-semibold mb-4">📊 Data Source</h4>
        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p className="mb-2">
            This dashboard is powered by your Google Sheets data, providing real-time insights into your business performance.
          </p>
          <p className="mb-2">
            <strong>Sheet:</strong> Balance
          </p>
          <p className="mb-2">
            <strong>Data Range:</strong> {totalMonths} months of financial data
          </p>
          <p>
            <strong>Last Update:</strong> Data refreshes automatically when you click the refresh button
          </p>
        </div>
      </div>
    </div>
  );
}

