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
import designRoute from "./routes/designRoute.js";
import aboutUsRoute from "./routes/aboutUsRoute.js";
import robotRoute from "./routes/robotRoute.js";

// connects the link to the routes
// app.use(link, route);
app.use("/robots.txt", robotRoute);
app.use("/", homeRoute);
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/designs", designRoute);
app.use("/about-us", aboutUsRoute);
