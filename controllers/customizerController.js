import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import User from "../models/userModel.js";

export const getCustomizationPage = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../public/views/customization.html"));
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
