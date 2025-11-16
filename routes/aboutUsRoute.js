import express from "express";
import {
  getAboutUsPage,
  getAboutUsPageByName,
  submitContactUsForm,
} from "../controllers/aboutUsController.js";

const router = express.Router();

router.get("/", getAboutUsPage);
router.get("/:username", getAboutUsPageByName);
router.post(`/submit`, submitContactUsForm);

export default router;
