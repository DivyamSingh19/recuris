import React from 'react'

const Appointments = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-1'>My Appointments</h1>
      <p className='text-muted-foreground'>Your patient's appointments will be displayed here</p>

      <div className='flex items-center justify-center mt-10'>
        <h2 className='text-xl font-semibold'>No appointments</h2>
      </div>
    </div>
  )
}

export default Appointments