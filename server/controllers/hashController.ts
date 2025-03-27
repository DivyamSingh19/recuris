// import { PrismaClient } from "@prisma/client";
// import { Request,Response } from "express";
// import { createToken } from "../utils/token";
// import crypto from "crypto"

// const prisma = new PrismaClient();
// interface Data{
//     id : string,
//     walletAddress : string,
//     createdAt:Date,
//     fileName:string,
//     hashCode:string,
//     fileSize :string,
//     patientId :number,
    

// }
// interface DataDC{
//     id : string,
//     walletAddressDc : string,
//     walletAddressPatient : string,
//     createdAt:Date,
//     fileName:string,
//     hashCode:string,
//     fileSize :string,
//     patientId :number,
//     diagnosticCenterId:number

// }
// const encryptHash = (hash:string,encryptionKey:string) => {
    
//     const iv = crypto.randomBytes(16);
      
     
//     const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  
//     let encrypted = cipher.update(hash);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
     
//     return iv.toString('hex') + ':' + encrypted.toString('hex');
//   };
  
// const decryptHash = (encryptedData:string, encryptionKey:string) => {
//     const textParts = encryptedData.split(':');
//     const iv = Buffer.from(textParts[0], 'hex');
//     const encryptedText = Buffer.from(textParts[1], 'hex');
//     const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
//     let decrypted = decipher.update(encryptedText);
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return decrypted.toString();
//   };
  
// async function hashController(req:Request,res:Response) {
//     try {
//         const {hashCode,fileName,fileSize,walletAddress,createdAt,patientId,diagnosticCenterId} = req.body as Data
//         if(!hashCode){
//             return res.json({success:false,message:"No hash code provided"})
//         }
//         if(!fileName){
//             return res.json({success:false,message:"No name provided"})
//         }
//         if(!walletAddress){
//             return res.json({success:false,message:"Wallet address not provided"})
//         }
       
//         const ENCRYPTION_KEY = process.env.HASH_ENCRYPTION_KEY; // 32-byte key (64 hex chars)
//         if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
//           return res.status(500).json({
//             success: false,
//             message: 'Server encryption configuration error'
//           });
//         }
        
//         encryptHash(hashCode, Buffer.from(ENCRYPTION_KEY, 'hex').toString('hex'));

    
//         const encryptedData = await prisma.encrypted.create({
//             data:{
               
//                 fileName,
//                 fileSize,
//                 patientId,
//                 walletAddress,
//                 createdAt
//             }
//         })
        
//         const token = createToken(encryptedData.id) 
//         return res.json({message:"sent",token})
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:(error as Error).message
            
//         })
//     }
// }
// async function getHash(req: Request,res:Response){
//     try {
//         const {patientId,walletAddress,id} = req.body as Data
//     } catch (error) {
        
//     }
// }
  
 
  
// async function hashControllerDC(req:Request,res:Response) {
//     try {
//         const {hashCode,fileName,fileSize,walletAddressDc,walletAddressPatient,createdAt,patientId,diagnosticCenterId} = req.body as DataDC
//         if(!hashCode){
//             return res.json({success:false,message:"No hash code provided"})
//         }
//         if(!fileName){
//             return res.json({success:false,message:"No name provided"})
//         }
//         if(!walletAddressDc){
//             return res.json({success:false,message:"Wallet address not provided"})
//         }
//         if(!walletAddressPatient){
//             return res.json({success:false,message:"Patient Wallet address not provided"})
//         }
       
//         const ENCRYPTION_KEY = process.env.HASH_ENCRYPTION_KEY;  
//         if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
//           return res.status(500).json({
//             success: false,
//             message: 'Server encryption configuration error'
//           });
//         }
        
//         encryptHash(hashCode, Buffer.from(ENCRYPTION_KEY, 'hex').toString('hex'));

    
//         const encryptedData = await prisma.encrypted.create({
//             data:{
               
//                 fileName,
//                 fileSize,
//                 patientId,
//                 diagnosticCenterId,
//                 walletAddressPatient
//                 walletAddressDc,
//                 createdAt
//             }
//         })
        
//         const token = createToken(encryptedData.id) 
//         return res.json({message:"sent",token})
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:(error as Error).message
            
//         })
//     }
// }
// async function getHashDC(req:Request,res:Response){
//     try {
//         const {patientId,walletAddress,id} = req.body as Data
//     } catch (error) {
        
//     }
// }
// export  {hashController,getHash}