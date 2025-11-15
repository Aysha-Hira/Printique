import path from "path";
import { fileURLToPath } from "url";
import Design from "../models/Designs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDesignPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/designs.html"));
};

export const saveDesign = async (req, res) => {
  try {
    const design = await Design.create({
      title: req.body.title,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      color: req.body.color,
      color2: req.body.color2,
      imageUrl: req.file.path, // Multer gives this
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
