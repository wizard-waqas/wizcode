import React from 'react';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';

interface SummaryTabProps {
  darkMode: boolean;
}

const SummaryTab: React.FC<SummaryTabProps> = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className={`p-8 rounded-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Business Performance Summary</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Key insights from your financial and operational data
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-blue-500" />
              Financial Performance
            </h3>
            <ul className="space-y-3 pl-9">
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="font-medium">Revenue Growth:</span> Your business experienced a significant turning point in March 2025, with revenue jumping from $140 in February to $3,995 in March (a 2700% increase).
              </li>
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="font-medium">Profit Margin Improvement:</span> Your profit margin has shown consistent improvement, starting from negative values in December 2024 (-24.65%) and January 2025 (-110.83%) to reaching a peak of 72.19% in June 2025.
              </li>
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="font-medium">Highest Revenue Month:</span> May 2025 was your best month for revenue at $4,305.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <Users className="h-6 w-6 text-green-500" />
              Operational Metrics
            </h3>
            <ul className="space-y-3 pl-9">
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="font-medium">Client Growth:</span> The number of clients increased dramatically from 6 in February to 19 in March, peaking at 21 clients in May 2025.
              </li>
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="font-medium">Service Popularity:</span> Package B (front + rear) has been your most popular service offering, with peak demand of 12 installations in May 2025.
              </li>
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="font-medium">Hourly Rate:</span> Your hourly rate improved significantly from negative values in January to $108.29 in June, indicating improved operational efficiency.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <Calendar className="h-6 w-6 text-yellow-500" />
              Seasonal Patterns
            </h3>
            <ul className="space-y-3 pl-9">
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Business activity appears to peak in spring months (March-May), with both client numbers and revenue reaching their highest points during this period.
              </li>
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                After the peak in May, there's a noticeable decline in June, which might indicate a seasonal pattern to monitor.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-purple-500" />
              Future Outlook
            </h3>
            <ul className="space-y-3 pl-9">
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Based on the current growth trajectory, your business shows strong potential for continued profitability.
              </li>
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The consistent improvement in profit margin suggests effective cost management alongside revenue growth.
              </li>
              <li className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The lifetime profit margin of 34.05% indicates a healthy business model.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;

