//define the routes
import express from "express";
import {
  getAllUsers,
  updateData,
  deleteUser,
  loginUser,
  signUpUser,
  getProfile,
  getProfileByName,
} from "../controllers/userController.js";

//get the route from express
const route = express.Router();

//sign up
route.post("/signup", signUpUser);

// login
route.post("/login", loginUser);

//route for get all users
route.get("/getAllUsers", getAllUsers);

//route for update user data
route.put("/update/:id", updateData);

//route for delete user
route.delete("deleteUser/:id", deleteUser);

route.get("/profile", getProfile);

route.get(`/profile/:name`, getProfileByName);

//export route
export default route;
