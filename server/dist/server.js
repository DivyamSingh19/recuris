"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const appointmentRoute_1 = __importDefault(require("./routes/appointmentRoute"));
const bookingRoute_1 = __importDefault(require("./routes/bookingRoute"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = 4000;
const dotenv = require('dotenv');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(dotenv());
//api
app.use("/api/user", userRoute_1.default);
app.use("/api/appointment", appointmentRoute_1.default);
app.use("/api/booking", bookingRoute_1.default);
//global catches
app.listen("Server started on :" + port);
