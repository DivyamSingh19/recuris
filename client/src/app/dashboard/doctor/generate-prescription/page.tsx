"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

// Define Prescription Interface
interface Prescription {
  patientAddress: string;
  medication: string;
  dosage: string;
  frequency: string;
  durationDays: string;
  walletAddress: string;
}

const GeneratePres: React.FC = () => {
  // State for prescription form
  const [prescription, setPrescription] = useState<Prescription>({
    patientAddress: '',
    medication: '',
    dosage: '',
    frequency: '',
    durationDays: '',
    walletAddress: '' // Doctor's wallet address
  });

  // State for blockchain transaction
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  // const walletAddress = localStorage.getItem("walletAddress");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: keyof Prescription, value: string) => {
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
      const validationErrors: string[] = [];
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
        validationErrors.forEach(error => toast.error(error));
        return;
      }

      // Call backend to create prescription on blockchain
      const response = await axios.post('/api/prescriptions/create', prescription);

      // Handle successful submission
      toast.success("Prescription successfully added to blockchain");

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

    } catch (error: any) {
      console.error('Prescription submission error:', error);
      toast.error(
        error.response?.data?.message || "Failed to create prescription"
      );
    }
  };

  return (
    <>
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Prescription
          </h2>

          {/* Patient Blockchain Address */}
          <div className="mb-4">
            <Label>
              Patient Ethereum Address
            </Label>
            <Input 
              name="patientAddress"
              value={prescription.patientAddress}
              onChange={handleInputChange}
              placeholder="0x..."
              required
              />
          </div>

          {/* Doctor's Wallet Address */}
          <div className="mb-4">
            <Label>
              Doctor&apos;s Wallet Address
            </Label>
            <Input 
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
              <Label>
                Medication
              </Label>
              <Input 
                name="medication"
                value={prescription.medication}
                onChange={handleInputChange}
                placeholder="Medication name"
                required
                />
            </div>
            <div>
              <Label>
                Dosage
              </Label>
              <Select 
                value={prescription.dosage}
                onValueChange={(value) => handleSelectChange('dosage', value)}
                >
                <SelectTrigger>
                  <SelectValue placeholder="Select Dosage" />
                </SelectTrigger>
                <SelectContent>
                  {['5mg', '10mg', '15mg', '20mg', '25mg'].map(dose => (
                    <SelectItem key={dose} value={dose}>{dose}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>
                Frequency
              </Label>
              <Select 
                value={prescription.frequency}
                onValueChange={(value) => handleSelectChange('frequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Frequency" />
                </SelectTrigger>
                <SelectContent>
                  {['Once Daily', 'Twice Daily', 'Three Times Daily', 'As Needed'].map(freq => (
                    <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-4">
            <Label>
              Treatment Duration (Days)
            </Label>
            <Input 
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
              <Label>
                Transaction Hash:
              </Label>
              <p className="text-sm text-green-700 truncate">{transactionHash}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            onClick={submitPrescription} 
            className="w-full"
            type="button"
            >
            Create Prescription
          </Button>
        </div>
      </div>
    </div>
            </>
  );
};

export default GeneratePres;