//now writting other apis thats why putting import here
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import User from "../models/userModel.js";

//fetch all users in database
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length == 0) {
      return res.status(404).json({ mess: "user not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

//write method for update
export const updateData = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ mess: "user not found" });
    }
    //pass id, to return new updated value new true
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

//function for delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ mess: "user not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// signing up
export const signUpUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    //validate if user laready exist
    const { username, name, email } = userData;
    const userExist = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const savedUserData = await userData.save();
    res.status(200).json({ message: "User signed up successfully!" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    if (userExist.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res
      .status(200)
      .json({ username: userExist.username, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfileByName = async (req, res) => {
  try {
    const name = req.params.username;
    if (name == "guest") return getProfile(req, res);

    const userExist = await User.findOne({ username: name });
    if (!userExist) return res.status(404).json({ message: "user not found" });

    return res.sendFile(path.join(__dirname, "../public/views/profile.html"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const name = req.params.username;
    if (name == "guest") return getProfile(req, res);

    const userExist = await User.findOne({ username: name });
    if (!userExist) return res.status(404).json({ message: "user not found" });

    return res.status(200).json(userExist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
