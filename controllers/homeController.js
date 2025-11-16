import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import User from "../models/userModel.js";

export const getSignUpPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/signup.html"));
};

export const getLoginPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/login.html"));
};

export const getHomePage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/home.html"));
};

export const getHomePageByName = async (req, res) => {
  try {
    const name = req.params.username;
    console.log(name);
    const userExist = await User.findOne({ username: name });
    // console.log(userExist);
    if (!userExist) 
      return res.status(404).json({ message: "user not found" });

    return getHomePage(req, res);
  } catch (error) {
    console.error(error);
  }
};

export const getPaymentPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/payment.html"));
};

export const getErrorPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/error.html"));
};
