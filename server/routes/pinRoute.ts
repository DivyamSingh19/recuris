import express from "express"
import { createPin,changePin } from "../controllers/pinController";
const pinRouter =express.Router();

pinRouter.post("/create",createPin);
pinRouter.post("/change-pin",changePin)


export default pinRouter