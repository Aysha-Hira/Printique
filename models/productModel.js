// Imports mongoose
import mongoose from "mongoose";

// creates schema (basically columns' headers of a table)
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  images: [
    {
      url: { type: String, required: true },
      alt: { type: String, required: true },
    },
  ],

  //   if product is in stock
  inStock: {
    type: Boolean,
    required: true,
  },

  // stock_quantity: {
  //   type: Number,
  //   required: true,
  //   min: 0,
  // },

  //   if the product is hidden or not
  isActive: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("products", productSchema);
