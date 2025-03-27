import { Request, Response } from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import axios from "axios"

// Zod schema for input validation
const HealthInsightRequestSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required")
});

class HealthInsightsController {
  private genAI: GoogleGenerativeAI;
  private upload: multer.Multer;

  constructor() {
    // Initialize Google Generative AI 
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Configure multer for file upload
    this.upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(__dirname, '../uploads');
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, `health-doc-${Date.now()}${path.extname(file.originalname)}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type. Only PDFs are allowed.'));
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024 // 10MB file size limit
      }
    });
  }

  // Middleware to handle file upload
  uploadDocument = (req: Request, res: Response, next: Function) => {
    this.upload.single('healthDocument')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: 'File upload error',
          error: err.message
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: 'Invalid file',
          error: err.message
        });
      }
      next();
    });
  }

  // Main method to generate health insights
//   async generateHealthInsights(req: Request, res: Response) {
//     try {
//       // Validate request body
//       const validatedBody = HealthInsightRequestSchema.parse(req.body);
      
//       // Ensure file was uploaded
//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: 'No document uploaded'
//         });
//       }

//       // Read the PDF file
//       const fileBuffer = fs.readFileSync(req.file.path);

//       // Initialize Gemini model
//       const model = this.genAI.getGenerativeModel({ 
//         model: "gemini-pro-vision" 
//       });

//       // Prepare prompt for AI analysis
//       const prompt = `Analyze this medical document and provide a comprehensive health insights summary. 
//       Extract key medical information, potential health risks, and recommended follow-up actions. 
//       Format the response as a structured JSON with clear, actionable insights.`;

//       // Generate insights
//       const result = await model.generateContent({
//         contents: [{ 
//           role: 'user', 
//           parts: [
//             { text: prompt },
//             { inlineData: { 
//               mimeType: 'application/pdf', 
//               data: fileBuffer.toString('base64') 
//             }}
//           ]
//         }]
//       });

//       // Parse and clean up insights
//       const insights = result.response.text();

//       // Clean up uploaded file
//       fs.unlinkSync(req.file.path);

//       // Return insights
//       res.status(200).json({
//         success: true,
//         patientId: validatedBody.patientId,
//         insights: JSON.parse(insights)
//       });

//     } catch (error: any) {
//       // Clean up file in case of error
//       if (req.file) {
//         fs.unlinkSync(req.file.path);
//       }

//       // Handle different types of errors
//       if (error instanceof z.ZodError) {
//         return res.status(400).json({
//           success: false,
//           message: 'Validation Error',
//           errors: error.errors
//         });
//       }

//       // Generic error handler
//       res.status(500).json({
//         success: false,
//         message: 'Failed to generate health insights',
//         error: error.message
//       });
//     }
//   }

async generateHealthInsights(req: Request, res: Response) {
    try {
      const { documentHash, patientId } = req.body;
  
      // Validate inputs
      if (!documentHash) {
        return res.status(400).json({
          success: false,
          message: 'No document uploaded'
        });
      }
  
      // Fetch document from IPFS
      const ipfsGateway = 'https://amber-labour-rooster-149.mypinata.cloud/ipfs';
      const documentUrl = `${ipfsGateway}${documentHash}`;
  
      try {
        // Fetch the file from IPFS
        const response = await axios.get(documentUrl, {
          responseType: 'arraybuffer'
        });
  
        // Convert to buffer
        const documentBuffer = Buffer.from(response.data);
  
        // Initialize Gemini model
        const model = this.genAI.getGenerativeModel({ 
          model: "gemini-pro-vision" 
        });
  
        // Prepare prompt for AI analysis
        const prompt = `Analyze this medical document and provide a comprehensive health insights summary. 
        Extract key medical information, potential health risks, and recommended follow-up actions. 
        Format the response as a structured JSON with clear, actionable insights.`;
  
        // Generate insights
        const result = await model.generateContent({
          contents: [{ 
            role: 'user', 
            parts: [
              { text: prompt },
              { inlineData: { 
                mimeType: 'application/pdf', // or adjust based on actual file type
                data: documentBuffer.toString('base64') 
              }}
            ]
          }]
        });
  
        // Parse and clean up insights
        const insights = result.response.text();
  
        // Return insights
        res.status(200).json({
          success: true,
          patientId,
          insights: JSON.parse(insights)
        });
  
      } catch (fetchError: any) {
        return res.status(400).json({
          success: false,
          message: 'Failed to fetch document from IPFS',
          error: fetchError.message
        });
      }
  
    } catch (error: any) {
      // Generic error handler
      res.status(500).json({
        success: false,
        message: 'Failed to generate health insights',
        error: error.message
      });
    }
  }

  

  // Error handling method
  private handleError(res: Response, error: Error) {
    console.error('Health Insights Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

export default HealthInsightsController;