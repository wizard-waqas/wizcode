const { google } = require('googleapis');

// Test Google Sheets API connection and show full data structure
async function showFullSheetStructure() {
  console.log('🔍 Analyzing full Google Sheets structure...');
  
  try {
    // Load environment variables
    require('dotenv').config({ path: '.env.local' });
    
    // Parse credentials
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    
    // Fix newline characters in private key
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }
    
    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Test connection with your spreadsheet
    const SPREADSHEET_ID = '1Z5R5rAsHJ3xSkWHXaT7HFrxtIp94IXMgAuQGRDxSMEw';
    const SHEET_NAME = 'Balance';
    const RANGE = 'A:H';
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });
    
    const rows = response.data.values;
    
    console.log('📊 Full sheet structure:');
    console.log('='.repeat(80));
    
    for (let i = 0; i < rows.length; i++) {
      console.log(`Row ${i + 1}:`, JSON.stringify(rows[i]));
    }
    
    console.log('='.repeat(80));
    console.log(`Total rows: ${rows.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the analysis
showFullSheetStructure();

