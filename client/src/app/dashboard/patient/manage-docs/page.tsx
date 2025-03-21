import IPFSUploader from '@/components/IPFSUploader'
import React from 'react'

const ManageDocs = () => {
  return (
    <div>
      <h1>ManageDocs</h1>
      <h1 className="text-2xl font-bold mb-6 text-center">IPFS Upload with Pinata</h1>
      <IPFSUploader />
    </div>
  )
}

export default ManageDocs