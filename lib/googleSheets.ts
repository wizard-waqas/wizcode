import { google } from 'googleapis';
import type {
  GoogleSheetsResponse,
  BusinessDataRow,
  ProcessedBusinessData,
  BusinessDataWithGrowth,
  BusinessDataWithMargins,
  CurrentMonthData,
  BusinessSummary,
  ServiceAccountCredentials,
  GoogleSheetsConfig,
  ValueParser,
  DateFormatter,
  ChangeCalculator,
  MonthName,
  SheetRowIdentifier,
  MONTH_NAMES,
  SHEET_ROW_IDENTIFIERS
} from '../types/dashboard';

// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG: GoogleSheetsConfig = {
  spreadsheetId: '1Z5R5rAsHJ3xSkWHXaT7HFrxtIp94IXMgAuQGRDxSMEw',
  sheetName: 'Balance',
  range: 'A:H'
};

// Service account credentials from environment variable
const getServiceAccountCredentials = (): ServiceAccountCredentials | null => {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    try {
      const credentials: ServiceAccountCredentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      
      // Fix newline characters in private key if they were escaped
      if (credentials.private_key) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
      }
      
      return credentials;
    } catch (error) {
      console.error('Error parsing service account credentials:', error);
      return null;
    }
  }
  
  // Fallback for development/build time
  return {
    type: "service_account",
    project_id: "trivvi-6a057",
    private_key_id: "dummy",
    private_key: "-----BEGIN PRIVATE KEY-----\nDUMMY_KEY\n-----END PRIVATE KEY-----\n",
    client_email: "dummy@trivvi-6a057.iam.gserviceaccount.com",
    client_id: "dummy",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/dummy",
    universe_domain: "googleapis.com"
  };
};

// Initialize Google Sheets API
const initializeGoogleSheets = () => {
  const credentials = getServiceAccountCredentials();
  
  if (!credentials) {
    throw new Error('Google service account credentials not found');
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
};

// Utility functions with proper typing
const parseValue: ValueParser = (value) => {
  if (!value || value === '') return 0;
  // Remove any currency symbols, commas, and convert to number
  const cleaned = value.toString().replace(/[$,]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

const formatDate: DateFormatter = (dateStr) => {
  if (!dateStr) return '';
  
  // Handle different date formats
  if (dateStr.includes('-')) {
    return dateStr; // Already in YYYY-MM format
  }
  
  // Convert "Month YYYY" to "YYYY-MM" format
  if (dateStr.includes('2024') || dateStr.includes('2025')) {
    const [month, year] = dateStr.split(' ');
    const monthNum = MONTH_NAMES[month as MonthName];
    if (monthNum) {
      return `${year}-${monthNum}`;
    }
  }
  
  return dateStr;
};

const calculateChange: ChangeCalculator = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return parseFloat(((current - previous) / previous * 100).toFixed(1));
};

// Fetch data from Google Sheets
export const fetchSheetData = async (range: string = GOOGLE_SHEETS_CONFIG.range): Promise<BusinessDataRow[]> => {
  try {
    const sheets = initializeGoogleSheets();
    
    const response: GoogleSheetsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
      range: `${GOOGLE_SHEETS_CONFIG.sheetName}!${range}`,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('No data found in the sheet');
      return [];
    }

    // Parse the actual sheet structure
    const headers = rows[0]; // ["", "December 2024", "January 2025", ...]
    const months = headers.slice(1); // Remove empty first column
    
    // Find the data rows using type-safe identifiers
    const expensesRow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.TOTAL_EXPENSES);
    const revenueRow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.REVENUE);
    const earningsRow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.EARNINGS);
    const clientsRow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.NUMBER_OF_CLIENTS);
    const packageARow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.PACKAGE_A);
    const packageBRow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.PACKAGE_B);
    const packageCRow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.PACKAGE_C);
    const hourlyRateRow = rows.find(row => row[0] === SHEET_ROW_IDENTIFIERS.HOURLY_RATE);
    
    // Transform data to expected format
    const data: BusinessDataRow[] = [];
    
    for (let i = 1; i < months.length + 1; i++) {
      const monthName = months[i - 1];
      const formattedMonth = formatDate(monthName);
      
      const parseRowValue = (row: string[] | undefined, index: number): number => {
        return parseValue(row?.[index]);
      };
      
      data.push({
        Date: formattedMonth,
        Revenue: parseRowValue(revenueRow, i),
        Expenses: parseRowValue(expensesRow, i),
        Earnings: parseRowValue(earningsRow, i),
        Clients: parseRowValue(clientsRow, i),
        'Package A': parseRowValue(packageARow, i),
        'Package B': parseRowValue(packageBRow, i),
        'Package C': parseRowValue(packageCRow, i),
        'Hourly Rate': parseRowValue(hourlyRateRow, i),
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    
    // Return sample data for development/fallback
    return getSampleData();
  }
};

// Process raw sheet data into dashboard format
export const processSheetData = (rawData: BusinessDataRow[]): ProcessedBusinessData[] => {
  return rawData.map(row => ({
    month: row.Date,
    revenue: row.Revenue,
    expenses: row.Expenses,
    earnings: row.Earnings,
    clients: row.Clients,
    packageA: row['Package A'],
    packageB: row['Package B'],
    packageC: row['Package C'],
    hourlyRate: row['Hourly Rate'],
  })).filter(row => row.month); // Filter out rows without dates
};

// Calculate growth metrics
export const calculateGrowthMetrics = (data: ProcessedBusinessData[]): BusinessDataWithGrowth[] => {
  return data.map((current, index): BusinessDataWithGrowth => {
    if (index === 0) {
      return {
        ...current,
        revenueGrowth: 0,
        clientGrowth: 0,
      };
    }

    const previous = data[index - 1];
    const revenueGrowth = calculateChange(current.revenue, previous.revenue);
    const clientGrowth = calculateChange(current.clients, previous.clients);

    return {
      ...current,
      revenueGrowth,
      clientGrowth,
    };
  });
};

// Calculate profit margins
export const calculateProfitMargins = (data: BusinessDataWithGrowth[]): BusinessDataWithMargins[] => {
  return data.map(row => ({
    ...row,
    margin: row.revenue === 0 ? 0 : parseFloat(((row.earnings / row.revenue) * 100).toFixed(2)),
  }));
};

// Get current month data
export const getCurrentMonthData = (data: BusinessDataWithMargins[]): CurrentMonthData | null => {
  if (!data || data.length === 0) return null;
  
  const currentMonth = data[data.length - 1];
  const previousMonth = data.length > 1 ? data[data.length - 2] : null;

  return {
    expenses: currentMonth.expenses,
    revenue: currentMonth.revenue,
    profit: currentMonth.earnings,
    clients: currentMonth.clients,
    month: currentMonth.month,
    expensesChange: previousMonth ? calculateChange(currentMonth.expenses, previousMonth.expenses) : 0,
    revenueChange: previousMonth ? calculateChange(currentMonth.revenue, previousMonth.revenue) : 0,
    profitChange: previousMonth ? calculateChange(currentMonth.earnings, previousMonth.earnings) : 0,
    clientsChange: previousMonth ? calculateChange(currentMonth.clients, previousMonth.clients) : 0,
  };
};

// Calculate business summary
export const calculateBusinessSummary = (data: BusinessDataWithMargins[]): BusinessSummary => {
  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalExpenses = data.reduce((sum, row) => sum + row.expenses, 0);
  const totalEarnings = data.reduce((sum, row) => sum + row.earnings, 0);
  const lifetimeProfitMargin = totalRevenue === 0 ? 0 : parseFloat(((totalEarnings / totalRevenue) * 100).toFixed(2));
  
  // Find peak month
  const peakRevenueMonth = data.reduce((max, row) => 
    row.revenue > max.revenue ? row : max, data[0] || { revenue: 0, month: 'N/A' });
  
  return {
    totalRevenue,
    totalExpenses,
    totalEarnings,
    lifetimeProfitMargin,
    peakRevenueMonth: peakRevenueMonth?.month || 'N/A',
    peakRevenue: peakRevenueMonth?.revenue || 0,
    totalMonths: data.length,
  };
};

// Sample data for development/fallback with proper typing
const getSampleData = (): BusinessDataRow[] => [
  { Date: '2024-12', Revenue: 1000, Expenses: 1246.5, Earnings: -246.5, Clients: 3, 'Package A': 2, 'Package B': 1, 'Package C': 0, 'Hourly Rate': 20.83 },
  { Date: '2025-01', Revenue: 1200, Expenses: 2530, Earnings: -1330, Clients: 4, 'Package A': 2, 'Package B': 2, 'Package C': 0, 'Hourly Rate': -13.83 },
  { Date: '2025-02', Revenue: 140, Expenses: 175, Earnings: -35, Clients: 6, 'Package A': 3, 'Package B': 2, 'Package C': 1, 'Hourly Rate': 11.67 },
  { Date: '2025-03', Revenue: 3995, Expenses: 1115, Earnings: 2880, Clients: 19, 'Package A': 7, 'Package B': 10, 'Package C': 2, 'Hourly Rate': 81.32 },
  { Date: '2025-04', Revenue: 3200, Expenses: 1100, Earnings: 2100, Clients: 16, 'Package A': 5, 'Package B': 8, 'Package C': 3, 'Hourly Rate': 68.75 },
  { Date: '2025-05', Revenue: 4305, Expenses: 1200, Earnings: 3105, Clients: 21, 'Package A': 6, 'Package B': 12, 'Package C': 3, 'Hourly Rate': 88.27 },
  { Date: '2025-06', Revenue: 2100, Expenses: 780, Earnings: 1320, Clients: 8, 'Package A': 3, 'Package B': 4, 'Package C': 1, 'Hourly Rate': 108.29 },
];

