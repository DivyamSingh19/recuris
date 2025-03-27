import { Button } from '@/components/ui/button'
import { File } from 'lucide-react'
import React from 'react'

const AiInsights = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold'>AI Insights</h1>
      <p className='text-muted-foreground'>View all your records insights with the help of our advanced AI model</p>
      <h2 className='mt-6 mb-3 text-lg font-semibold'>Your Records:</h2>
      <div className='flex flex-col gap-4'>
        <div className='bg-sidebar/50 hover:bg-sidebar p-4 rounded-xl border flex items-center justify-between'>
          <p className='font-medium flex items-center gap-2'>
            <File size={18} />
            <span>DocName.png</span>
          </p>
          <div className='flex items-center gap-4'>
            <Button variant="link">View Record</Button>
            <Button>Generate Insights</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiInsights