import path from "path";
import { fileURLToPath } from "url";
import Design from "../models/Designs.js";
import Product from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDesignPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/designs.html"));
};

export const saveDesign = async (req, res) => {
  try {
    const product_type = req.body.product_type;
    const product = await Product.findOne({ name: product_type });
    
    const price = Number(
      (
        Math.random() * (product.max_price - product.min_price) +
        product.min_price
      ).toFixed(2)
    );

    const design = await Design.create({
      title: req.body.title,
      product_type: req.body.product_type,
      email: req.body.email,
      price: price,

      length: req.body.length,
      width: req.body.width,
      height: req.body.height,

      color_1: req.body.color_1,
      color_2: req.body.color_2,

      reference: req.body.reference,
      imageUrl: product.images[0].url,
    });

    res.json({ success: true, design });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save design" });
  }
};

export const getDesigns = async (req, res) => {
  const designs = await Design.find().sort({ _id: -1 });
  res.json(designs);
};
