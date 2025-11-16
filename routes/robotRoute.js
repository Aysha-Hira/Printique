import express from "express";
import { getRobotTxt } from "../controllers/robotController.js";

const router = express.Router();

router.get("/", getRobotTxt);

export default router;
