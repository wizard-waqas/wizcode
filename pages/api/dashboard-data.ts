import type { NextApiRequest, NextApiResponse } from 'next';
import { 
  fetchSheetData, 
  processSheetData, 
  calculateGrowthMetrics, 
  calculateProfitMargins, 
  getCurrentMonthData,
  calculateBusinessSummary
} from '../../lib/googleSheets';
import type { DashboardApiResponse, ApiError } from '../../types/dashboard';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      data: {
        financialData: [],
        currentMonth: null,
        summary: {
          totalRevenue: 0,
          totalExpenses: 0,
          totalEarnings: 0,
          lifetimeProfitMargin: 0,
          peakRevenueMonth: 'N/A',
          peakRevenue: 0,
          totalMonths: 0,
        },
        lastUpdated: new Date().toISOString(),
      },
      message: 'Method not allowed' 
    });
  }

  try {
    // Fetch raw data from Google Sheets
    const rawData = await fetchSheetData();
    
    // Process the data through the pipeline
    const processedData = processSheetData(rawData);
    const dataWithGrowth = calculateGrowthMetrics(processedData);
    const dataWithMargins = calculateProfitMargins(dataWithGrowth);
    
    // Get current month metrics
    const currentMonth = getCurrentMonthData(dataWithMargins);
    
    // Calculate summary statistics
    const summary = calculateBusinessSummary(dataWithMargins);
    
    const response: DashboardApiResponse = {
      success: true,
      data: {
        financialData: dataWithMargins,
        currentMonth,
        summary,
        lastUpdated: new Date().toISOString(),
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    const apiError = error as ApiError;
    
    res.status(500).json({ 
      success: false, 
      data: {
        financialData: [],
        currentMonth: null,
        summary: {
          totalRevenue: 0,
          totalExpenses: 0,
          totalEarnings: 0,
          lifetimeProfitMargin: 0,
          peakRevenueMonth: 'N/A',
          peakRevenue: 0,
          totalMonths: 0,
        },
        lastUpdated: new Date().toISOString(),
      },
      message: 'Failed to fetch data from Google Sheets',
      error: apiError.message 
    });
  }
}

