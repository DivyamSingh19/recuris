"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter, Eye } from 'lucide-react';

interface Doctor {
    id: string;
    name: string;
    specialization: string;
    prescriptions: {
      id: string;
      date: string;
      patient: string;
      medications: {
        name: string;
        dosage: string;
        frequency: string;
      }[];
      diagnosis: string;
      duration: string;
    }[];
  }

// Mock data - in real implementation, this would come from blockchain/backend
const initialDoctors = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    specialization: 'Cardiology',
    prescriptions: [
      {
        id: 'rx001',
        date: '2024-02-15',
        patient: 'John Doe',
        medications: [
          { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' },
          { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily' }
        ],
        diagnosis: 'Hypertension',
        duration: '3 months'
      },
      {
        id: 'rx002',
        date: '2024-03-10',
        patient: 'Jane Smith',
        medications: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
        ],
        diagnosis: 'Heart Failure',
        duration: '6 months'
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    specialization: 'Endocrinology',
    prescriptions: [
      {
        id: 'rx003',
        date: '2024-01-20',
        patient: 'Alice Johnson',
        medications: [
          { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
          { name: 'Insulin Glargine', dosage: '20 units', frequency: 'Once at bedtime' }
        ],
        diagnosis: 'Type 2 Diabetes',
        duration: '12 months'
      }
    ]
  }
];

const PrescriptionHistory = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const renderMedications = (medications: any) => {
    return medications.map((med: any, index: any) => (
      <div key={index} className="mb-1">
        {med.name} - {med.dosage} ({med.frequency})
      </div>
    ));
  };

  return (
    <>
    <div>
        <h1 className='font-bold text-3xl mb-1'>My Prescriptions</h1>
        <p className='text-muted-foreground'>All your past prescriptions will be shown here</p>
    </div>
    <div className="container mx-auto my-4">
      <Card>
        <CardHeader>
          <CardTitle>Prescription History by Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Doctors List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Total Prescriptions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map(doctor => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.prescriptions.length}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedDoctor(doctor)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Prescriptions
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Prescriptions by {doctor.name}</DialogTitle>
                        </DialogHeader>
                        
                        {/* Prescriptions Table */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Patient</TableHead>
                              <TableHead>Medications</TableHead>
                              <TableHead>Diagnosis</TableHead>
                              <TableHead>Duration</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {doctor.prescriptions.map(prescription => (
                                <TableRow key={prescription.id}>
                                <TableCell>{prescription.date}</TableCell>
                                <TableCell>{prescription.patient}</TableCell>
                                <TableCell>
                                  {renderMedications(prescription.medications)}
                                </TableCell>
                                <TableCell>{prescription.diagnosis}</TableCell>
                                <TableCell>{prescription.duration}</TableCell>
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

export default PrescriptionHistory;