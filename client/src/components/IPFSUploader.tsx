// components/IPFSUploader.tsx
"use client"
import { useState, useEffect, ChangeEvent } from 'react';

export default function IPFSUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [ipfsHash, setIpfsHash] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    // Get wallet address from localStorage
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToPinata = async (): Promise<void> => {
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading to IPFS...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('walletAddress', walletAddress);

      const response = await fetch('/api/upload-to-pinata', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setIpfsHash(data.IpfsHash);
        setUploadStatus('Upload successful!');

        // Send the hash to your Express backend
      // const backendResponse = await fetch('http://localhost:4000/api/data/ipfs', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ipfsHash: data.IpfsHash,
      //     walletAddress,
      //     fileName: file.name,
      //     fileSize: file.size,
      //     timestamp: new Date().toISOString()
      //   }),
      // });
      
      // if (backendResponse.ok) {
      //   setUploadStatus('Upload complete and hash saved to backend!');
      // } else {
      //   const backendError = await backendResponse.json();
      //   setUploadStatus(`Upload successful, but failed to save hash: ${backendError.message}`);
      // }
      } else {
        setUploadStatus(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Upload to IPFS via Pinata</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Connected Wallet:</p>
        <p className="text-sm font-mono bg-gray-100 p-2 rounded overflow-hidden text-ellipsis">
          {walletAddress || 'No wallet connected'}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select file to upload
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {file && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Selected file: {file.name}</p>
        </div>
      )}

      <button
        onClick={uploadToPinata}
        disabled={!file || isUploading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-gray-400"
      >
        {isUploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>

      {uploadStatus && (
        <div className={`mt-4 p-3 rounded ${ipfsHash ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
          <p>{uploadStatus}</p>
          {ipfsHash && (
            <div className="mt-2">
              <p className="text-sm font-bold">IPFS Hash:</p>
              <p className="text-sm font-mono break-all">{ipfsHash}</p>
              <a 
                href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm block mt-2"
              >
                View on IPFS Gateway
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}