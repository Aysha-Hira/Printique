import express from "express";
import multer from "multer";
import path from "path";
import { getCustomizationPage } from "../controllers/customizerController.js";

const router = express.Router();

router.get("/", getCustomizationPage);
router.get("/:name", getCustomizationPage);
// router.get("/list", getDesigns);
// router.post("/save", upload.single("design"), saveDesign);

export default router;
