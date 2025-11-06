import express from "express";
import {
  addProduct,
  customizeProduct,
  getAllProductsInfo,
  getProductsPage,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProductsPage);
router.get("/getAllProducts", getAllProductsInfo);
router.get("/customize/:name", customizeProduct);
router.post("/add-product", addProduct);

export default router;
