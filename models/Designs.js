import mongoose from "mongoose";
const designSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    product_type: { type: String, required: true },
    email: { type: String },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    color_1: { type: String, required: true },
    color_2: { type: String },
    reference: { type: String },
    imageUrl: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

//export model for design collection
export default mongoose.model("Design", designSchema);
