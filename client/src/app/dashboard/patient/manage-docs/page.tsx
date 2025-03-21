import IPFSUploader from '@/components/IPFSUploader'
import React from 'react'

const ManageDocs = () => {
  return (
    <div>
      <h1 className='font-bold text-3xl mb-10'>ManageDocs</h1>
      <h2 className="text-2xl font-bold mb-6 text-center">IPFS Upload with Pinata</h2>
      <IPFSUploader />
    </div>
  )
}

export default ManageDocs