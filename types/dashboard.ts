// Type definitions for Google Sheets Dashboard

// Raw Google Sheets data structure
export interface GoogleSheetsRow {
  [key: string]: string | undefined;
}

export interface GoogleSheetsResponse {
  data: {
    values: string[][];
  };
}

// Business data types
export interface BusinessDataRow {
  Date: string;
  Revenue: number;
  Expenses: number;
  Earnings: number;
  Clients: number;
  'Package A': number;
  'Package B': number;
  'Package C': number;
  'Hourly Rate': number;
}

export interface ProcessedBusinessData {
  month: string;
  revenue: number;
  expenses: number;
  earnings: number;
  clients: number;
  packageA: number;
  packageB: number;
  packageC: number;
  hourlyRate: number;
}

export interface BusinessDataWithGrowth extends ProcessedBusinessData {
  revenueGrowth: number;
  clientGrowth: number;
}

export interface BusinessDataWithMargins extends BusinessDataWithGrowth {
  margin: number;
}

// Current month metrics
export interface CurrentMonthData {
  expenses: number;
  revenue: number;
  profit: number;
  clients: number;
  month: string;
  expensesChange: number;
  revenueChange: number;
  profitChange: number;
  clientsChange: number;
}

// Summary statistics
export interface BusinessSummary {
  totalRevenue: number;
  totalExpenses: number;
  totalEarnings: number;
  lifetimeProfitMargin: number;
  peakRevenueMonth: string;
  peakRevenue: number;
  totalMonths: number;
}

// Dashboard API response
export interface DashboardApiResponse {
  success: boolean;
  data: {
    financialData: BusinessDataWithMargins[];
    currentMonth: CurrentMonthData | null;
    summary: BusinessSummary;
    lastUpdated: string;
  };
  message?: string;
  error?: string;
}

// Google Sheets API configuration
export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  range: string;
}

// Service account credentials
export interface ServiceAccountCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

// Chart data types for Recharts
export interface ChartDataPoint {
  month: string;
  revenue?: number;
  expenses?: number;
  earnings?: number;
  margin?: number;
  clients?: number;
  revenueGrowth?: number;
  clientGrowth?: number;
  packageA?: number;
  packageB?: number;
  packageC?: number;
}

// Component props types
export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  format?: 'currency' | 'number' | 'percentage';
  className?: string;
}

export interface TabButtonProps {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
  onClick: (id: string) => void;
}

export interface DashboardTabProps {
  data: BusinessDataWithMargins[];
  currentMonth: CurrentMonthData | null;
  summary: BusinessSummary;
  isLoading?: boolean;
}

// File upload types
export interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, sheetUrl?: string) => Promise<void>;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Theme types
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

// Error types
export interface ApiError {
  message: string;
  code?: string | number;
  details?: any;
}

// Utility types
export type ValueParser = (value: string | undefined) => number;
export type DateFormatter = (dateStr: string) => string;
export type ChangeCalculator = (current: number, previous: number) => number;

// Constants
export const MONTH_NAMES = {
  'January': '01',
  'February': '02', 
  'March': '03',
  'April': '04',
  'May': '05',
  'June': '06',
  'July': '07',
  'August': '08',
  'September': '09',
  'October': '10',
  'November': '11',
  'December': '12'
} as const;

export type MonthName = keyof typeof MONTH_NAMES;

// Sheet row identifiers
export const SHEET_ROW_IDENTIFIERS = {
  TOTAL_EXPENSES: 'Total Expenses',
  REVENUE: 'Revenue',
  EARNINGS: 'Earnings',
  NUMBER_OF_CLIENTS: 'Number of Clients',
  PACKAGE_A: 'Package A (front)',
  PACKAGE_B: 'Package B (front + rear)',
  PACKAGE_C: 'Package C (backup camera)',
  HOURLY_RATE: 'Hourly Rate'
} as const;

export type SheetRowIdentifier = typeof SHEET_ROW_IDENTIFIERS[keyof typeof SHEET_ROW_IDENTIFIERS];

