import express from "express";
import {
  getAllUsersController,
  createUserController,
  findUserByIdController,
  loginController,
} from "../controllers/user.controllers.js";
import { createUserDTO, userLoginDTO } from "../validators/users-dto.js";

const Router = express.Router();

Router.route("/")
  .get(getAllUsersController)
  .post(createUserDTO, createUserController);

Router.route("/login").post(userLoginDTO, loginController);

Router.route("/:id").get(findUserByIdController);

export default Router;
