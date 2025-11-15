import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";

import OpenAI from "openai";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true })); // for making sure the the values are in json format
app.use(bodyParser.json());
app.use("/upload", express.static("uploads")); // serve uploaded images
dotenv.config();

// static folders
app.use(express.static(path.join(__dirname, "public")));

//Read configuration
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

//Connect mongodb (Database)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("database connected successfully");
    app.listen(PORT, () => {
      console.log(`application is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

//import from route
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";
import homeRoute from "./routes/homeRoute.js";
import customizationRoute from "./routes/customizerRoute.js";
import designRoute from "./routes/designRoute.js";
import aboutUsRoute from "./routes/aboutUsRoute.js";

// connects the link to the routes
// app.use(link, route);
app.use("/", homeRoute);
app.use("/home", homeRoute);
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/customization", customizationRoute);
app.use("/designs", designRoute);
app.use("/about-us", aboutUsRoute);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({storage});

// app.post("/designs", upload.single("design"), async (req, res) => {

// })

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// app.post("/generate", async (req, res) => {
//   const { prompt, color, extra } = req.body;

//   try {
//     const response = await client.images.generate({
//       model: "gpt-imag e-1",
//       prompt: `${prompt}. Use color scheme ${color}. ${extra || ""}`,
//       size: "512x512"
//     });

//     res.json({ image: response.data[0].url });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

// const response = openai.responses.create({
//   model: "gpt-5-nano",
//   input: "write a haiku about ai",
//   store: true,
// });

// response.then((result) => console.log(result.output_text));
