import express from "express";
import { addProduct, getAllProductsInfo, getProductsPage } from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProductsPage);
router.get("/getAllProducts", getAllProductsInfo);
router.post("/add-product", addProduct);

export default router;