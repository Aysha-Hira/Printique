import express from "express";
import {
  addProduct,
  getAllProductsInfo,
  getAProduct,
  getProductsPage,
  getProductsPageByName,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProductsPage); // home
router.get("/getAllProducts", getAllProductsInfo);
router.get("/getProduct/:name", getAProduct);
router.get("/:name", getProductsPageByName); 
router.post("/add-product", addProduct);

export default router;
