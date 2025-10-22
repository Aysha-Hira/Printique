//Simple method to show hello world on browser this is for testing first api
export const fetchUser = async (req, res) => {
  try {
    return res.json("hello world");
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

//now writting other apis thats why putting import here
import User from "../models/userModel.js";

//Create user API
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    //validate if user laready exist
    const { email } = userData;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const savedUserData = await userData.save();
    res.status(200).json(savedUserData);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

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
    res.status(201).jso({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
