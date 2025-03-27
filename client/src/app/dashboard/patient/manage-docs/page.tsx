"use client"
import IPFSUploader from '@/components/IPFSUploader'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import React, { useState, useEffect } from 'react'

const ManageDocs = () => {
  const [records, setRecords] = useState([])
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)
  const walletAddress = localStorage.getItem("walletAddress");

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/patient/view-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ walletAddress })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch records')
      }

      const data = await response.json()
      setRecords(data.records)
    } catch (error) {
      console.error('Error fetching records:', error)
      // Optionally, add error toast or notification
    }
  }

  useEffect(() => {
    if (walletAddress) {
      fetchRecords()
    }
  }, [walletAddress])

  const handleUploadClick = () => {
    setIsUploaderOpen(true)
  }

  const handleCloseUploader = () => {
    setIsUploaderOpen(false)
    // Optionally, refresh records after upload
    fetchRecords()
  }

  return (
    <div className="">
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='font-bold text-3xl mb-1'>My Docs</h1>
          <p className='text-muted-foreground'>Manage all your documents here</p>
        </div>
        <Button onClick={handleUploadClick}>Upload New</Button>
      </div>

      {records.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>File Type</TableHead>
              <TableHead>IPFS Hash</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record: any) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{new Date(record.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>{record.fileType}</TableCell>
                <TableCell className="truncate max-w-[150px]">{record.ipfsHash}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://gateway.pinata.cloud/ipfs/${record.ipfsHash}`, '_blank')}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          No documents found. Upload your first document!
        </div>
      )}

      {isUploaderOpen && (
        <IPFSUploader onClose={() => setIsUploaderOpen(false)} />
      )}
    </div>
  )
}

export default ManageDocs