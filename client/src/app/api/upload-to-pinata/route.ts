import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { unlink } from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';
import pinataSDK from '@pinata/sdk';

export async function POST(request: NextRequest) {
  try {
    // Create a unique temporary file path
    const tempDir = os.tmpdir();
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const formData = await request.formData();
    
    // Get wallet address from form data
    const walletAddress = formData.get('walletAddress') as string || 'unknown-user';
    
    // Get file from form data
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create a unique filename for temporary storage
    const originalName = file.name;
    const fileExtension = originalName.split('.').pop() || '';
    const tempFilePath = path.join(tempDir, `${uniqueId}.${fileExtension}`);
    
    // Convert file to buffer and write to temp file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(tempFilePath, buffer);
    
    // Initialize Pinata client with your API keys
    const pinata = new pinataSDK({
      pinataApiKey: process.env.PINATA_API_KEY as string,
      pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY as string,
    });

    // Test the authentication
    await pinata.testAuthentication();

    // Create options for pinata with metadata
    const options = {
        pinataMetadata: {
          name: originalName
        },
        pinataOptions: {}
      };

    // Upload file to IPFS using Pinata
    const result = await pinata.pinFromFS(tempFilePath, options);
    
    // Clean up the temporary file
    await unlink(tempFilePath);

    // Return success response
    return NextResponse.json({
      success: true,
      IpfsHash: result.IpfsHash,
      PinSize: result.PinSize,
      Timestamp: result.Timestamp,
    });
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}