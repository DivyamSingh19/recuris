import React, { useState } from 'react';
import axios from 'axios';

const HealthInsightsUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      
      // Validate PDF
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('healthDocument', file);
    formData.append('patientId', 'patient123'); // Replace with actual patient ID

    try {
      setLoading(true);
      setError(null);

      // Send to Express backend
      const response = await axios.post('http://localhost:3001/api/health-insights', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Insights:', response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Failed to upload document'
      );
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        accept=".pdf"
        onChange={handleFileChange} 
      />
      <button 
        type="submit" 
        disabled={!file || loading}
      >
        {loading ? 'Uploading...' : 'Generate Insights'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};

export default HealthInsightsUploader;