import { Schema, model } from "mongoose";
import { IToDo } from "../types/Todo";

const ToDoModel = new Schema<IToDo>({
    title: {
        type: String,
        required: true,
        unique: true,
        index: 1,
        trim: true,
        maxlength: 50
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 256
    },

    status: {
        type: String,
        required: true,
        enum: ["ACTIVE", "DONE", "BIN"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required:true
    }
}, {
    timestamps: true
})

export default model<IToDo>("ToDoModel", ToDoModel, "todos")