const { google } = require('googleapis');

// Test Google Sheets API connection
async function testGoogleSheetsConnection() {
  console.log('🔍 Testing Google Sheets API connection...');
  
  try {
    // Load environment variables
    require('dotenv').config({ path: '.env.local' });
    
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.error('❌ GOOGLE_SERVICE_ACCOUNT_KEY environment variable not found');
      return;
    }
    
    console.log('✅ Environment variable found');
    
    // Parse credentials
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    
    // Fix newline characters in private key
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }
    
    console.log('✅ Credentials parsed successfully');
    console.log('📧 Service account email:', credentials.client_email);
    
    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('✅ Google Sheets API initialized');
    
    // Test connection with your spreadsheet
    const SPREADSHEET_ID = '1Z5R5rAsHJ3xSkWHXaT7HFrxtIp94IXMgAuQGRDxSMEw';
    const SHEET_NAME = 'Balance';
    const RANGE = 'A:H';
    
    console.log(`🔗 Attempting to connect to spreadsheet: ${SPREADSHEET_ID}`);
    console.log(`📊 Sheet name: ${SHEET_NAME}`);
    console.log(`📋 Range: ${RANGE}`);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });
    
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('⚠️  No data found in the sheet');
      console.log('📝 This could mean:');
      console.log('   1. The sheet is empty');
      console.log('   2. The sheet name "Balance" doesn\'t exist');
      console.log('   3. The service account doesn\'t have access');
      return;
    }
    
    console.log('🎉 SUCCESS! Data retrieved from Google Sheets');
    console.log(`📊 Found ${rows.length} rows of data`);
    console.log('📋 Headers:', rows[0]);
    console.log('📈 Sample data (first 3 rows):');
    
    for (let i = 0; i < Math.min(3, rows.length); i++) {
      console.log(`   Row ${i + 1}:`, rows[i]);
    }
    
  } catch (error) {
    console.error('❌ Error testing Google Sheets connection:');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    if (error.message.includes('permission')) {
      console.log('\n🔧 SOLUTION: Share your Google Sheet with the service account');
      console.log('📧 Email to share with: wizcode-sheets-reader@trivvi-6a057.iam.gserviceaccount.com');
      console.log('🔒 Permission level: Viewer');
    }
    
    if (error.message.includes('not found')) {
      console.log('\n🔧 SOLUTION: Check if the sheet name "Balance" exists in your spreadsheet');
    }
  }
}

// Run the test
testGoogleSheetsConnection();

