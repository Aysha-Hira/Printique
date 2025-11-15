import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import ContactUsForm from "../models/ContactUsModel.js"

export const getAboutUsPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/about-us.html"));
};

export const getAboutUsPageByName = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/about-us.html"));
};

export const submitContactUsForm = async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.name || !body.email || !body.message)
      return res.status(400).json({
        msg: `fields are required: ${body}, ${body.name}, ${body.email}, ${body.message}`,
      });

    const ContactUsFormDetails = await ContactUsForm.create({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    console.log("form: " + ContactUsFormDetails);
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log("Internal Server Error");
    res.status(500).json({ message: "Internal server error" });
  }
};
