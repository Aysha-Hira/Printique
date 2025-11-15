import express from "express";
import {
  getAboutUsPage,
  submitContactUsForm,
} from "../controllers/aboutUsController.js";

const router = express.Router();

router.get("/", getAboutUsPage);
// router.get("/about-us/:userName", getAboutUsPage);
router.post(`/submit`, submitContactUsForm);

export default router;
