import express from "express";
import multer from "multer";
import path from "path";
import {
  getDesignPage,
  getDesignPageByName,
  listDesigns,
  listDesignsByName,
  saveDesign,
} from "../controllers/designController.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/assets/uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", getDesignPage);
router.get("/:username", getDesignPageByName); // get the page when logged in

router.post("/save", upload.single("design"), saveDesign); // Edit in few
router.get("/list", listDesigns);
router.get("/list/:username", listDesignsByName); // probably change from email to name EDITTT
export default router;
