import IPFSUploader from '@/components/IPFSUploader'
import { Button } from '@/components/ui/button'
import React from 'react'

const ManageDocs = () => {
  return (
    <div>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='font-bold text-3xl mb-1'>My Docs</h1>
          <p className='text-muted-foreground'>Manage all your documents here</p>
        </div>
        <Button>Upload New</Button>
      </div>
      <IPFSUploader />
    </div>
  )
}

export default ManageDocs