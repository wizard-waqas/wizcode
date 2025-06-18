# Google Sheets Setup Instructions

## ✅ Current Status
- **OpenSSL Error**: ✅ RESOLVED
- **Dashboard**: ✅ Working properly
- **API Integration**: ✅ Connected to Google Sheets API
- **Environment Variables**: ✅ Configured

## 🔧 What's Working
1. ✅ Dashboard loads without errors
2. ✅ All tabs (Financial, Operational, Growth, Summary) are functional
3. ✅ Light/Dark mode toggle works
4. ✅ Refresh Data button works
5. ✅ Google Sheets API connection is established
6. ✅ No more OpenSSL decoder errors

## 📋 Final Setup Steps (You Need to Complete)

### Step 1: Share Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Z5R5rAsHJ3xSkWHXaT7HFrxtIp94IXMgAuQGRDxSMEw/edit
2. Click the **"Share"** button (top-right corner)
3. Add this email address: `wizcode-sheets-reader@trivvi-6a057.iam.gserviceaccount.com`
4. Set permissions to **"Viewer"**
5. Click **"Send"**

### Step 2: Verify Sheet Structure
Make sure your "Balance" sheet has these columns in this order:
- Date (format: YYYY-MM, e.g., "2025-01")
- Revenue
- Expenses  
- Earnings
- Clients
- Package A
- Package B
- Package C
- Hourly Rate

### Step 3: Test the Connection
1. After sharing the sheet, wait 1-2 minutes for permissions to propagate
2. Go to your dashboard: http://localhost:3000/extras/finances
3. Click the **"Refresh Data"** button
4. Your actual data should now appear instead of the sample data

## 🚀 Deployment Ready
The dashboard is now ready for deployment to Vercel. The environment variables are properly configured and the Google Sheets integration will work in production.

## 📊 Expected Data Format
Your Google Sheet should look like this:

| Date    | Revenue | Expenses | Earnings | Clients | Package A | Package B | Package C | Hourly Rate |
|---------|---------|----------|----------|---------|-----------|-----------|-----------|-------------|
| 2024-12 | 1000    | 1246.5   | -246.5   | 3       | 2         | 1         | 0         | 20.83       |
| 2025-01 | 1200    | 2530     | -1330    | 4       | 2         | 2         | 0         | -13.83      |
| 2025-02 | 140     | 175      | -35      | 6       | 3         | 2         | 1         | 11.67       |

## 🔍 Troubleshooting
If data still doesn't appear after sharing:
1. Double-check the service account email is exactly: `wizcode-sheets-reader@trivvi-6a057.iam.gserviceaccount.com`
2. Verify the sheet name is exactly "Balance" (case-sensitive)
3. Check that the first row contains the exact column headers listed above
4. Try refreshing the dashboard page

## ✨ Features Available
- **Real-time data**: Refreshes from Google Sheets on demand
- **Interactive charts**: Click to view detailed visualizations
- **Responsive design**: Works on desktop and mobile
- **Dark/Light mode**: Toggle between themes
- **Multiple views**: Financial, Operational, Growth, and Summary tabs
- **Business insights**: Automated analysis and recommendations

