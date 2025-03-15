"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingController_1 = require("../controllers/bookingController");
const express_1 = __importDefault(require("express"));
const bookingRouter = express_1.default.Router();
bookingRouter.post("/createBooking", bookingController_1.createBooking);
bookingRouter.post("/editBooking", bookingController_1.editBooking);
exports.default = bookingRouter;
