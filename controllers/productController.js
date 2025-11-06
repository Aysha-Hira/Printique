import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Product from "../models/productModel.js";

export const getProductsPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/products.html"));
};

export const getAllProductsInfo = async (req, res) => {
  try {
    const products = await Product.find(); // returns array if if its 1 product

    if (products.length == 0) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const productData = new Product(req.body);
    if (
      !productData ||
      !productData.name ||
      !productData.price ||
      !productData.images ||
      !productData.inStock ||
      !productData.isActive
    )
      return res.status(400).json({
        msg: `fields are required: 
      ${productData},`,
      });

    const { name, price, images, inStock, isActive } = productData;
    const productExist = await Product.findOne({ name: name });

    if (productExist) {
      return res.status(400).json({ message: "product already exist" });
    }

    const savedUserData = await productData.save();
    res.status(200).json(savedUserData);
  } catch (error) {
    res.status(500).json({ message: error + "internal server error" });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const producIdName = req.params.id;
    const productExist = await Product.findOne({ _id: id });

    if (!productExist) {
      return res.status(404).json({ message: "product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findOne({ _id: id });
    if (!productExist) {
      return res.status(404).json({ mess: "product not found" });
    }

    const product = await Product.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "product '" + product.name + "' deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const customizeProduct = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../public/views/customization.html"));
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
