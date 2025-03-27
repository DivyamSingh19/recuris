import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const MyAppointments = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold mb-1'>My Appointments</h1>
          <p className='text-muted-foreground'>All your appointments will appear here</p>
        </div>
        <Button>
          <Link href="/dashboard/patient/book-appointment">Book an Appointment</Link>
        </Button>
      </div>

      <div className='flex items-center flex-col justify-center my-20'>
        {/* Display the already booked appointments */}
        <h2 className='text-xl'>No appointments</h2>
      </div>
    </div>
  )
}

export default MyAppointments