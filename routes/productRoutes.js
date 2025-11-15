import express from "express";
import {
  addProduct,
  getAllProductsInfo,
  getAProduct,
  getAProductPrice,
  getProductsPage,
  getProductsPageByName,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProductsPage); // home
router.get("/getAllProducts", getAllProductsInfo);
router.get("/getProduct/:type", getAProduct);
router.get("/getProductPrice/:type", getAProductPrice);
router.get("/:name", getProductsPageByName); 
router.post("/add-product", addProduct);

export default router;
