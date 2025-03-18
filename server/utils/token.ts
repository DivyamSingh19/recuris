import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"


export const createToken = (id :string|number) => {
    return JWT.sign({id},process.env.JWT_SECRET as string)
}

// export function verifyToken(token: string): { id: number } | null {
//   try {
     
//     const decoded = JWT.verify(token, process.env.JWT_SECRET as string,) ;
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// }

 
// export function extractAndVerifyToken(authHeader: string | undefined): { id: number } | null {
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return null;
//   }
  
//   const token = authHeader.split(' ')[1];
//   return verifyToken(token);
// }