import React, { useState } from 'react';
import { X, Upload, AlertCircle, CheckCircle } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, darkMode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sheetDbUrl, setSheetDbUrl] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setUploadStatus('idle');
    } else {
      alert('Please select a CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file || !sheetDbUrl) {
      alert('Please select a file and enter your SheetDB URL');
      return;
    }

    setUploading(true);
    setUploadStatus('idle');

    try {
      // Parse CSV file
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] || '';
          });
          return obj;
        });

      // Send to SheetDB
      const response = await fetch(sheetDbUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        setUploadStatus('success');
        setTimeout(() => {
          onClose();
          // Refresh the page to show updated data
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Failed to upload to SheetDB');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full rounded-xl p-6 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Update Spreadsheet</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* SheetDB URL Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              SheetDB API URL
            </label>
            <input
              type="url"
              value={sheetDbUrl}
              onChange={(e) => setSheetDbUrl(e.target.value)}
              placeholder="https://sheetdb.io/api/v1/your-sheet-id"
              className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get your SheetDB URL from{' '}
              <a 
                href="https://sheetdb.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                sheetdb.io
              </a>
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Upload CSV File
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              darkMode 
                ? 'border-gray-600 hover:border-gray-500' 
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              <Upload className={`mx-auto h-12 w-12 mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
              >
                Choose CSV file
              </label>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                or drag and drop
              </p>
              {file && (
                <p className={`text-sm mt-2 font-medium ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>Upload successful! Refreshing dashboard...</span>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-100 text-red-800 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>Upload failed. Please check your SheetDB URL and try again.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || !sheetDbUrl || uploading}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                (!file || !sheetDbUrl || uploading)
                  ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;

