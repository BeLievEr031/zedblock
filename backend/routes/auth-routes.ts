import express from "express";
import AuthController from "../controller/AuthController"
import { auth } from "../middleware/auth";
const Router = express.Router();


Router.post("/register", AuthController.register)
Router.post("/login", AuthController.login)
Router.get("/whoami", auth, AuthController.whoAmI)

export default Router;