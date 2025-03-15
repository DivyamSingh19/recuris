"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDC = loginDC;
exports.loginAdmin = loginAdmin;
exports.loginDoctor = loginDoctor;
exports.loginPatient = loginPatient;
exports.registerAdmin = registerAdmin;
exports.registerDC = registerDC;
exports.registerDoctor = registerDoctor;
exports.registerPatient = registerPatient;
const client_1 = require("@prisma/client");
require("dotenv/config");
const prisma = new client_1.PrismaClient();
async function registerPatient(req, res) {
    // const {name,email,password}:User = req.body
    // if(!name || !email || !password){
    //     return res.json({success:false,message : "All fields are required"})
    // }
    // try {
    // } catch (error) {
    // }
}
async function loginPatient({ email, password }) {
    try {
    }
    catch (error) {
    }
}
async function registerAdmin() {
    try {
    }
    catch (error) {
    }
}
async function loginAdmin() {
    try {
    }
    catch (error) {
    }
}
async function registerDoctor({ name, email, password }) {
    try {
    }
    catch (error) {
    }
}
async function loginDoctor({ email, password }) {
    try {
    }
    catch (error) {
    }
}
async function registerDC() {
    try {
    }
    catch (error) {
    }
}
async function loginDC() {
    try {
    }
    catch (error) {
    }
}
