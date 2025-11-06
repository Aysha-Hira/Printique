import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//middleware for request parsing
app.use(express.urlencoded({ extended: true })); // for making sure the the values are in json format
app.use(bodyParser.json());
dotenv.config();

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

// static folders
app.use(express.static(path.join(__dirname, "public")));

//import from route
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";
import homeRoute from "./routes/homeRoute.js";

// connects the link to the routes
// app.use(link, route);
app.use("/", homeRoute);
app.use("/user", userRoute);
app.use("/products", productRoute);
// app.use("/about-us", aboutUsRoute)
