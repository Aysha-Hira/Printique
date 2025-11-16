import express from "express";
import {
  getErrorPage,
  getHomePage,
  getHomePageByName,
  getLoginPage,
  getPaymentPage,
  getSignUpPage,
} from "../controllers/homeController.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/home", getHomePage);
router.get("/home/:username", getHomePageByName);

router.get("/payment", getPaymentPage);
// router.get("/payment/:username", getPaymentPage);

router.get("/error", getErrorPage);

router.get("/signup", getSignUpPage);
router.get("/login", getLoginPage);

export default router;
