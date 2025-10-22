import express from "express";
import { getCustomizationPage, getErrorPage, getHomePage, getPaymentPage } from "../controllers/homeController.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/payment", getPaymentPage);
router.get("/customization", getCustomizationPage);
router.get("/error", getErrorPage);

export default router;
