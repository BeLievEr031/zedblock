import express from "express"
import { auth } from "../middleware/auth";
import ToDoController from "../controller/ToDoController";

const Router = express.Router()

Router.post("/", auth, ToDoController.create)
Router.get("/", auth, ToDoController.get)
Router.put("/", auth, ToDoController.edit)
Router.delete("/:id", auth, ToDoController.delete)
Router.put("/bulk", auth, ToDoController.bulkAction)

export default Router;