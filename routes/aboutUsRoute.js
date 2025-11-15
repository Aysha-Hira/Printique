import express from "express";
import { getAboutUsPage } from "../controllers/aboutUsController.js";

const router = express.Router();

router.get("/", getAboutUsPage);
// router.get("/about-us/:userName", getAboutUsPage);

export default router;
