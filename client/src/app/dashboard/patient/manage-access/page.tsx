"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Eye, Lock, Unlock } from 'lucide-react';

interface AccessEntry {
    entityName: string;
    walletAddress: string;
    expiryDate: string;
  }
  
  interface MedicalRecord {
    id: string;
    filename: string;
    uploadDate: string;
    currentAccess: AccessEntry[];
  }

// Mock data - in real implementation, this would come from blockchain/IPFS
const initialRecords = [
  {
    id: '1',
    filename: 'MRI_Scan_2024.pdf',
    uploadDate: '2024-03-15',
    currentAccess: [
      { 
        entityName: 'Dr. Smith Hospital', 
        walletAddress: "0x123...0A35D", 
        expiryDate: '2024-06-15' 
      }
    ]
  },
  {
    id: '2',
    filename: 'Blood_Test_Results.pdf',
    uploadDate: '2024-02-20',
    currentAccess: []
  }
];

const EHRAccessManagement = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [newAccessAddress, setNewAccessAddress] = useState('');

  const handleGrantAccess = (recordId: any) => {
    if (!newAccessAddress) {
      alert('Please enter a wallet address');
      return;
    }

    // Mock implementation of granting access
    const updatedRecords = records.map(record => 
      record.id === recordId 
        ? {
            ...record, 
            currentAccess: [
              ...record.currentAccess, 
              { 
                entityName: 'New Entity', 
                walletAddress: newAccessAddress,
                expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 90 days from now
              }
            ]
          }
        : record
    );

    setRecords(updatedRecords);
    setNewAccessAddress('');
    setSelectedRecord(null);
  };

  const handleRevokeAccess = (recordId: any, walletAddress: any) => {
    const updatedRecords = records.map(record => 
      record.id === recordId 
        ? {
            ...record, 
            currentAccess: record.currentAccess.filter(
              access => access.walletAddress !== walletAddress
            )
          }
        : record
    );

    setRecords(updatedRecords);
  };

  return (
    <>
    <div>
        <h1 className='font-bold text-3xl mb-1'>Manage Access</h1>
        <p className='text-muted-foreground'>All your records can be managed here</p>
    </div>
    <div className="container mx-auto my-4">
      <Card>
        <CardHeader>
          <CardTitle>My Health Records</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Records List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.filename}</TableCell>
                  <TableCell>{record.uploadDate}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedRecord(record)}
                        >
                          Manage Access
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                          <DialogTitle>Manage Access for {record.filename}</DialogTitle>
                        </DialogHeader>
                        
                        {/* Current Access List */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold my-2">Current Access</h3>
                          {record.currentAccess.length === 0 ? (
                              <p>No current access granted</p>
                            ) : (
                                <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Entity</TableHead>
                                  <TableHead>Wallet Address</TableHead>
                                  <TableHead>Expiry</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {record.currentAccess.map(access => (
                                  <TableRow key={access.walletAddress}>
                                    <TableCell>{access.entityName}</TableCell>
                                    <TableCell>{access.walletAddress}</TableCell>
                                    <TableCell>{access.expiryDate}</TableCell>
                                    <TableCell>
                                      <Button 
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRevokeAccess(record.id, access.walletAddress)}
                                        >
                                        <Lock className="mr-2 h-4 w-4" /> Revoke
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </div>

                        {/* Grant New Access */}
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="Enter Doctor/Insurance Company Wallet Address"
                            value={newAccessAddress}
                            onChange={(e) => setNewAccessAddress(e.target.value)}
                            />
                          <Button 
                            onClick={() => handleGrantAccess(record.id)}
                            >
                            <Unlock className="mr-2 h-4 w-4" /> Grant Access
                          </Button>
                        </div>
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

export default EHRAccessManagement;