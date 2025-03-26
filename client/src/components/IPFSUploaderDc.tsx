// components/IPFSUploader.tsx
"use client"
import { useState, useEffect, ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

export default function IPFSUploaderDC() {
  const [file, setFile] = useState<File | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [patientWalletAddress, setPatientWalletAddress] = useState<string>('');
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
    if (!patientWalletAddress) {
        toast("Please enter patient wallet address");
        return;
    }

    if (patientWalletAddress === walletAddress) {
        toast.error("Wallet addresses cannot be same.");
        return;
    }

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
      formData.append('patientWalletAddress', patientWalletAddress);

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
    <div className="max-w-md mx-auto p-4 bg-sidebar/50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Upload to IPFS via Pinata</h2>
      
      <div className="mb-4">
        <Label>Your Connected Wallet:</Label>
        <p className="text-sm font-mono bg-sidebar-accent p-2 rounded overflow-hidden text-ellipsis">
          {walletAddress || 'No wallet connected'}
        </p>
      </div>

      <div className='mb-4'> 
        <Label>Patient Wallet Address:</Label>
        <Input 
            type='text'
            placeholder="Enter the patient's wallet address"
            name='patientWalletAddress'
            id='patientWalletAddress'
            className='font-mono bg-white'
            value={patientWalletAddress}
            onChange={(e) => setPatientWalletAddress(e.target.value)}
            required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select file to upload
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10"
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
        className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 disabled:bg-gray-400"
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
                className="text-primary hover:underline text-sm block mt-2"
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