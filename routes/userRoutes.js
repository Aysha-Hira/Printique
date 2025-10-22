//define the routes
import express from "express"
import { fetchUser,create,getAllUsers, updateData,deleteUser} from "../controllers/userController.js";

//get the route from express
const route = express.Router();

route.get("/fetch",fetchUser)

//post ap route for creating user\
route.post("/create",create)

//route for get all users
route.get("/getAllUsers",getAllUsers)

//route for update user data
route.put("/update/:id",updateData)

//route for delete user
route.delete("deleteUser/:id",deleteUser)

//export route
export default route;