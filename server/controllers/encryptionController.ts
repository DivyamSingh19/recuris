import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = process.env.SECRET_KEY || "0123456789abcdef0123456789abcdef"; // 32-byte key
const IV = process.env.IV || "0123456789abcdef"; // 16-byte IV

app.use(express.json());

// AES-256 Encryption function
const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// AES-256 Decryption function
const decrypt = (encryptedText: string): string => {
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), IV);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

 