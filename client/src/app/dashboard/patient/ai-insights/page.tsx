"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { File, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

// Define a type for the record
interface Record {
  id: string;
  name: string;
  ipfsHash: string;
}

const AiInsights = () => {
  // State to manage records and loading
  const [records, setRecords] = useState<Record[]>([
    // Example data - replace with your actual data fetching method
    { 
      id: '1', 
      name: 'DocName.png', 
      ipfsHash: 'QmWfTKYyYYd7zcyihP25brbj2WUMkv9zbG67mRrs8Pyojo' 
    }
  ]);

  // State to track which record is generating insights
  const [loadingInsights, setLoadingInsights] = useState<string | null>(null);

  // Function to generate AI insights
  const generateInsights = async (record: Record) => {
    try {
      // Start loading for this specific record
      setLoadingInsights(record.id);

      // Send request to backend
      const response = await axios.post(`http://localhost:4000/api/ai/health-insights`, {
        documentHash: record.ipfsHash,
        patientId: 'your-patient-id' // Replace with actual patient ID
      });

      // Handle successful response
      toast.success('AI Insights Generated', {
        description: `Insights for ${record.name} are ready`
      });

      // Optional: You might want to store or display the insights
      console.log(response.data);
    } catch (error: any) {
      // Handle error
      toast.error('Failed to Generate Insights', {
        description: error.response?.data?.message || 'An unexpected error occurred'
      });
    } finally {
      // Stop loading
      setLoadingInsights(null);
    }
  };

  return (
    <div>
      <h1 className='text-3xl font-bold'>AI Insights</h1>
      <p className='text-muted-foreground'>
        View all your records insights with the help of our advanced AI model
      </p>
      
      <h2 className='mt-6 mb-3 text-lg font-semibold'>Your Records:</h2>
      
      <div className='flex flex-col gap-4'>
        {records.map((record) => (
          <div 
            key={record.id} 
            className='bg-sidebar/50 hover:bg-sidebar p-4 rounded-xl border flex items-center justify-between'
          >
            <p className='font-medium flex items-center gap-2'>
              <File size={18} />
              <span>{record.name}</span>
            </p>
            
            <div className='flex items-center gap-4'>
              <Button variant="link">View Record</Button>
              <Button 
                onClick={() => generateInsights(record)}
                disabled={loadingInsights === record.id}
              >
                {loadingInsights === record.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Insights'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiInsights