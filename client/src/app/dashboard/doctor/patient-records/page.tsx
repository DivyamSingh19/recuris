"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Download, FileText } from 'lucide-react';

// Comprehensive Interfaces for Type Safety
interface AccessEntry {
  entityName: string;
  walletAddress: string;
  expiryDate: string;
}

interface MedicalRecord {
  id: string;
  filename: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
  ipfsHash: string;
  currentAccess: AccessEntry[];
}

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  records: MedicalRecord[];
}

const DoctorPatientRecordsView: React.FC = () => {
  // Mock Patient Data with Comprehensive Details
  const initialPatients: PatientRecord[] = [
    {
      id: 'P001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      records: [
        {
          id: 'R001',
          filename: 'Cardiac_Scan_2024.pdf',
          fileType: 'PDF',
          uploadDate: '2024-03-15',
          fileSize: '2.5 MB',
          ipfsHash: 'QmXyz123...',
          currentAccess: [
            { 
              entityName: 'St. Mary\'s Hospital', 
              walletAddress: '0x123...', 
              expiryDate: '2024-06-15' 
            }
          ]
        },
        {
          id: 'R002',
          filename: 'Blood_Test_Results.pdf',
          fileType: 'PDF',
          uploadDate: '2024-02-20',
          fileSize: '1.2 MB',
          ipfsHash: 'QmAbc456...',
          currentAccess: []
        }
      ]
    },
    {
      id: 'P002',
      name: 'Emily Johnson',
      age: 32,
      gender: 'Female',
      records: [
        {
          id: 'R003',
          filename: 'Ultrasound_Report.pdf',
          fileType: 'PDF',
          uploadDate: '2024-03-01',
          fileSize: '3.1 MB',
          ipfsHash: 'QmDef789...',
          currentAccess: []
        }
      ]
    }
  ];

  // State Management with TypeScript
  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Handler to View Patient Records
  const handleViewPatientRecords = (patient: PatientRecord) => {
    setSelectedPatient(patient);
  };

  // Handler to Download Record
  const handleDownloadRecord = (record: MedicalRecord) => {
    // In a real implementation, this would:
    // 1. Fetch file from IPFS using ipfsHash
    // 2. Trigger download
    console.log('Downloading record:', record);
    alert(`Downloading ${record.filename}`);
  };

  return (
    <>
    <div>
      <h1 className='text-3xl font-bold mb-1'>Patient's Records</h1>
      <p className='text-muted-foreground'>All your patients records will appear here</p>
    </div>
    <div className="container mx-auto my-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Patients List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Total Records</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map(patient => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.records.length}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => handleViewPatientRecords(patient)}
                          >
                          <Eye className="mr-2 h-4 w-4" /> View Records
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Records for {patient.name}</DialogTitle>
                        </DialogHeader>
                        
                        {/* Patient Records Table */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Filename</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Upload Date</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {patient.records.map(record => (
                              <TableRow key={record.id}>
                                <TableCell>
                                  <div className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    {record.filename}
                                  </div>
                                </TableCell>
                                <TableCell>{record.fileType}</TableCell>
                                <TableCell>{record.uploadDate}</TableCell>
                                <TableCell>{record.fileSize}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDownloadRecord(record)}
                                    >
                                    <Download className="mr-2 h-4 w-4" /> Download
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
              </>
  );
};

export default DoctorPatientRecordsView;