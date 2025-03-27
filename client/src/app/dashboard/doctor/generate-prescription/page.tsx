import React, { useState } from 'react';
import axios from 'axios';

// Custom Toast Component
const Toast = ({ message, type }) => {
  return (
    <div 
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}
    >
      {message}
    </div>
  );
};

const GeneratePres = () => {
  // State for toast
  const [toast, setToast] = useState(null);

  // Toast utility function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    
    // Auto-dismiss toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };
  
  // State for prescription form
  const [prescription, setPrescription] = useState({
    patientAddress: '',
    medication: '',
    dosage: '',
    frequency: '',
    durationDays: '',
    walletAddress: '' // Doctor's wallet address
  });

  // State for blockchain transaction
  const [transactionHash, setTransactionHash] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit prescription to blockchain
  const submitPrescription = async () => {
    try {
      // Validate form
      const { 
        patientAddress, 
        medication, 
        dosage, 
        frequency, 
        durationDays, 
        walletAddress 
      } = prescription;

      // Comprehensive validation
      const validationErrors = [];
      if (!patientAddress || !patientAddress.startsWith('0x')) 
        validationErrors.push("Invalid Patient Ethereum Address");
      if (!medication) 
        validationErrors.push("Medication is required");
      if (!dosage) 
        validationErrors.push("Dosage is required");
      if (!frequency) 
        validationErrors.push("Frequency is required");
      if (!durationDays) 
        validationErrors.push("Duration is required");
      if (!walletAddress || !walletAddress.startsWith('0x')) 
        validationErrors.push("Invalid Doctor's Wallet Address");

      // Display validation errors
      if (validationErrors.length > 0) {
        showToast(validationErrors.join(", "), 'error');
        return;
      }

      // Call backend to create prescription on blockchain
      const response = await axios.post('/api/prescriptions/create', prescription);

      // Handle successful submission
      showToast("Prescription successfully added to blockchain");

      // Store transaction hash
      setTransactionHash(response.data.transactionHash);

      // Reset form after successful submission
      setPrescription({
        patientAddress: '',
        medication: '',
        dosage: '',
        frequency: '',
        durationDays: '',
        walletAddress: ''
      });

    } catch (error) {
      console.error('Prescription submission error:', error);
      showToast(
        error.response?.data?.message || "Failed to create prescription", 
        'error'
      );
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Blockchain Prescription Generation
          </h2>

          {/* Patient Blockchain Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Patient Ethereum Address
            </label>
            <input 
              className="w-full px-3 py-2 border rounded-lg"
              name="patientAddress"
              value={prescription.patientAddress}
              onChange={handleInputChange}
              placeholder="0x..."
              required
            />
          </div>

          {/* Doctor's Wallet Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Doctor&apos;s Wallet Address
            </label>
            <input 
              className="w-full px-3 py-2 border rounded-lg"
              name="walletAddress"
              value={prescription.walletAddress}
              onChange={handleInputChange}
              placeholder="0x..."
              required
            />
          </div>

          {/* Medication Details */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Medication
              </label>
              <input 
                className="w-full px-3 py-2 border rounded-lg"
                name="medication"
                value={prescription.medication}
                onChange={handleInputChange}
                placeholder="Medication name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Dosage
              </label>
              <select 
                className="w-full px-3 py-2 border rounded-lg"
                name="dosage"
                value={prescription.dosage}
                onChange={(e) => handleSelectChange('dosage', e.target.value)}
                required
              >
                <option value="">Select Dosage</option>
                {['5mg', '10mg', '15mg', '20mg', '25mg'].map(dose => (
                  <option key={dose} value={dose}>{dose}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Frequency
              </label>
              <select 
                className="w-full px-3 py-2 border rounded-lg"
                name="frequency"
                value={prescription.frequency}
                onChange={(e) => handleSelectChange('frequency', e.target.value)}
                required
              >
                <option value="">Select Frequency</option>
                {['Once Daily', 'Twice Daily', 'Three Times Daily', 'As Needed'].map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Treatment Duration (Days)
            </label>
            <input 
              className="w-full px-3 py-2 border rounded-lg"
              type="number"
              name="durationDays"
              value={prescription.durationDays}
              onChange={handleInputChange}
              placeholder="Number of days"
              required
            />
          </div>

          {/* Transaction Hash Display */}
          {transactionHash && (
            <div className="mt-4 p-2 bg-green-50 rounded">
              <label className="block text-gray-700 font-bold mb-2">
                Transaction Hash:
              </label>
              <p className="text-sm text-green-700 truncate">{transactionHash}</p>
            </div>
          )}

          {/* Submit Button */}
          <button 
            onClick={submitPrescription} 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            type="button"
          >
            Create Blockchain Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratePres;