import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = '1Z5R5rAsHJ3xSkWHXaT7HFrxtIp94IXMgAuQGRDxSMEw';
const SHEET_NAME = 'Balance';

// Service account credentials from environment variable
const getServiceAccountCredentials = () => {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
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

// Fetch data from Google Sheets
export const fetchSheetData = async (range = 'A:H') => {
  try {
    const sheets = initializeGoogleSheets();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${range}`,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('No data found in the sheet');
      return [];
    }

    // Convert rows to objects using first row as headers
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });

    return data;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    
    // Return sample data for development/fallback
    return getSampleData();
  }
};

// Process raw sheet data into dashboard format
export const processSheetData = (rawData) => {
  return rawData.map(row => {
    // Clean and parse numeric values
    const parseNumber = (value) => {
      if (!value || value === '') return 0;
      // Remove any currency symbols, commas, and convert to number
      const cleaned = value.toString().replace(/[$,]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    };

    // Parse date
    const parseDate = (dateStr) => {
      if (!dateStr) return null;
      // Handle different date formats
      if (dateStr.includes('-')) {
        return dateStr; // Already in YYYY-MM format
      }
      // Add other date parsing logic as needed
      return dateStr;
    };

    return {
      month: parseDate(row.Date || row.date),
      revenue: parseNumber(row.Revenue || row.revenue),
      expenses: parseNumber(row.Expenses || row.expenses),
      earnings: parseNumber(row.Earnings || row.earnings),
      clients: parseNumber(row.Clients || row.clients),
      packageA: parseNumber(row['Package A'] || row.packageA),
      packageB: parseNumber(row['Package B'] || row.packageB),
      packageC: parseNumber(row['Package C'] || row.packageC),
      hourlyRate: parseNumber(row['Hourly Rate'] || row.hourlyRate),
    };
  }).filter(row => row.month); // Filter out rows without dates
};

// Sample data for development/fallback
const getSampleData = () => [
  { Date: '2024-12', Revenue: '1000', Expenses: '1246.5', Earnings: '-246.5', Clients: '3', 'Package A': '2', 'Package B': '1', 'Package C': '0', 'Hourly Rate': '20.83' },
  { Date: '2025-01', Revenue: '1200', Expenses: '2530', Earnings: '-1330', Clients: '4', 'Package A': '2', 'Package B': '2', 'Package C': '0', 'Hourly Rate': '-13.83' },
  { Date: '2025-02', Revenue: '140', Expenses: '175', Earnings: '-35', Clients: '6', 'Package A': '3', 'Package B': '2', 'Package C': '1', 'Hourly Rate': '11.67' },
  { Date: '2025-03', Revenue: '3995', Expenses: '1115', Earnings: '2880', Clients: '19', 'Package A': '7', 'Package B': '10', 'Package C': '2', 'Hourly Rate': '81.32' },
  { Date: '2025-04', Revenue: '3200', Expenses: '1100', Earnings: '2100', Clients: '16', 'Package A': '5', 'Package B': '8', 'Package C': '3', 'Hourly Rate': '68.75' },
  { Date: '2025-05', Revenue: '4305', Expenses: '1200', Earnings: '3105', Clients: '21', 'Package A': '6', 'Package B': '12', 'Package C': '3', 'Hourly Rate': '88.27' },
  { Date: '2025-06', Revenue: '2100', Expenses: '780', Earnings: '1320', Clients: '8', 'Package A': '3', 'Package B': '4', 'Package C': '1', 'Hourly Rate': '108.29' },
];

// Calculate growth metrics
export const calculateGrowthMetrics = (data) => {
  return data.map((current, index) => {
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
};

// Calculate profit margins
export const calculateProfitMargins = (data) => {
  return data.map(row => ({
    ...row,
    margin: row.revenue === 0 ? 0 : parseFloat(((row.earnings / row.revenue) * 100).toFixed(2)),
  }));
};

// Get current month data
export const getCurrentMonthData = (data) => {
  if (!data || data.length === 0) return null;
  
  const currentMonth = data[data.length - 1];
  const previousMonth = data.length > 1 ? data[data.length - 2] : null;
  
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return parseFloat(((current - previous) / previous * 100).toFixed(1));
  };

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

