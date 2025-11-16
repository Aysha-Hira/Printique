import express from "express";
import {
  addProduct,
  getAllProductsInfo,
  getAProduct,
  getCustomizationPage,
  getCustomizationPageByName,
  getProductsPage,
  getProductsPageByName,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProductsPage); // home
router.get("/getAllProducts", getAllProductsInfo); // to get all products
router.get("/guest/customization/:type", getCustomizationPage);
router.get("/:username/customization/:type", getCustomizationPageByName);
router.get("/getProduct/:type", getAProduct); // to get info of a single product
router.get("/:username", getProductsPageByName); // home page if the user logs in
router.post("/add-product", addProduct); // to add products to db

export default router;
