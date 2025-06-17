import { fetchSheetData, processSheetData, calculateGrowthMetrics, calculateProfitMargins, getCurrentMonthData } from '../../lib/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch raw data from Google Sheets
    const rawData = await fetchSheetData();
    
    // Process the data
    const processedData = processSheetData(rawData);
    const dataWithGrowth = calculateGrowthMetrics(processedData);
    const dataWithMargins = calculateProfitMargins(dataWithGrowth);
    
    // Get current month metrics
    const currentMonth = getCurrentMonthData(dataWithMargins);
    
    // Calculate summary statistics
    const totalRevenue = dataWithMargins.reduce((sum, row) => sum + row.revenue, 0);
    const totalExpenses = dataWithMargins.reduce((sum, row) => sum + row.expenses, 0);
    const totalEarnings = dataWithMargins.reduce((sum, row) => sum + row.earnings, 0);
    const lifetimeProfitMargin = totalRevenue === 0 ? 0 : ((totalEarnings / totalRevenue) * 100).toFixed(2);
    
    // Find peak month
    const peakRevenueMonth = dataWithMargins.reduce((max, row) => 
      row.revenue > max.revenue ? row : max, dataWithMargins[0] || {});
    
    const response = {
      success: true,
      data: {
        financialData: dataWithMargins,
        currentMonth,
        summary: {
          totalRevenue,
          totalExpenses,
          totalEarnings,
          lifetimeProfitMargin: parseFloat(lifetimeProfitMargin),
          peakRevenueMonth: peakRevenueMonth?.month || 'N/A',
          peakRevenue: peakRevenueMonth?.revenue || 0,
          totalMonths: dataWithMargins.length,
        },
        lastUpdated: new Date().toISOString(),
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch data from Google Sheets',
      error: error.message 
    });
  }
}

