"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentController_1 = require("../controllers/appointmentController");
const express_1 = __importDefault(require("express"));
const appointmentRouter = express_1.default.Router();
appointmentRouter.post("/addAppointment", appointmentController_1.addAppointment);
appointmentRouter.post("/editAppointment", appointmentController_1.editAppointment);
appointmentRouter.post("/cancelAppointment", appointmentController_1.cancelAppointment);
exports.default = appointmentRouter;
