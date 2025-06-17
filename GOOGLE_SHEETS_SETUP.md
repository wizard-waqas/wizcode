# Google Sheets Integration Setup

## Environment Variables Required

To use the Google Sheets integration, you need to add the following environment variable to your Vercel deployment:

### GOOGLE_SERVICE_ACCOUNT_KEY

This should contain the entire JSON service account key as a string. You can set this in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add a new variable:
   - **Name**: `GOOGLE_SERVICE_ACCOUNT_KEY`
   - **Value**: The entire JSON content from your service account file (as a single line string)

## Google Sheet Configuration

- **Sheet ID**: `1Z5R5rAsHJ3xSkWHXaT7HFrxtIp94IXMgAuQGRDxSMEw`
- **Sheet Name**: `Balance`
- **Service Account Email**: Use the `client_email` from your service account JSON

Make sure the Google Sheet is shared with the service account email with "Viewer" permissions.

## Data Format Expected

The Google Sheet should have the following columns:
- Date (YYYY-MM format)
- Revenue
- Expenses  
- Earnings
- Clients
- Package A
- Package B
- Package C
- Hourly Rate

## Testing

Once the environment variable is set, the dashboard will automatically fetch data from your Google Sheet when you visit `/extras/finances`.

## Service Account Setup

1. Go to Google Cloud Console
2. Select your project
3. Enable Google Sheets API
4. Create a service account
5. Download the JSON key file
6. Share your Google Sheet with the service account email
7. Add the JSON content as an environment variable in Vercel

