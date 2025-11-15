import express from "express";
import multer from "multer";
import path from "path";
import { getDesignPage, getDesigns, saveDesign } from "../controllers/designController.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", getDesignPage);
router.get("/list", getDesigns);
router.post("/save", upload.single("design"), saveDesign);

export default router;
