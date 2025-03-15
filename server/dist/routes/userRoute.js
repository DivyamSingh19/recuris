"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.post("/register-patient", userController_1.registerPatient);
userRouter.post("/register-doctor", userController_1.registerDoctor);
userRouter.post("/register-dc", userController_1.registerDC);
userRouter.post("/register-admin", userController_1.registerAdmin);
userRouter.post("/login-patient", userController_1.loginPatient);
userRouter.post("/login-doctor", userController_1.loginDoctor);
userRouter.post("/login-dc", userController_1.loginDC);
userRouter.post("/login-admin", userController_1.loginAdmin);
exports.default = userRouter;
