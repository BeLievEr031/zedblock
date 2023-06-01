import mongoose from "mongoose";
import TodoModel from "../model/TodoModel";
import { IGetQuery, IPutQuery, IToDo } from "../types/Todo";

class ToDoService {
    async create(data: IToDo) {
        return await TodoModel.create(data);
    }

    async get(query: IGetQuery, userId: string) {
        const { page, limit, sortType, filter, keyword } = query;
        let result;
        let count;

        if (keyword) {
            result = await TodoModel.find({
                $and:
                    [{ createdBy: new mongoose.Types.ObjectId(userId) },
                    { $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }] },
                    { status: filter === "ALL" ? { $ne: "BIN" } : filter === "BIN" ? "BIN" : filter === "ACTIVE" ? "ACTIVE" : "DONE" },
                    ]
            }).skip((page - 1) * limit).limit(limit).sort(
                sortType === "A-Z" || sortType === "Z-A" ?
                    { title: sortType === "A-Z" ? 1 : -1 }
                    : { createdAt: sortType === "old-new" ? 1 : -1 }).select("-__v -updatedAt -createdBy")
            count = await TodoModel.countDocuments({
                $and:
                    [{ createdBy: new mongoose.Types.ObjectId(userId) },
                    { $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }] },
                    { status: filter === "ALL" ? { $ne: "BIN" } : filter === "BIN" ? "BIN" : filter === "ACTIVE" ? "ACTIVE" : "DONE" },
                    ]
            })

            return {
                result, count
            }
        }

        if (filter === "BIN") {

            result = await TodoModel.find({
                $and:
                    [{ createdBy: new mongoose.Types.ObjectId(userId) }, { status: "BIN" }]
            }).skip((page - 1) * limit).limit(limit).sort(
                sortType === "A-Z" || sortType === "Z-A" ?
                    { title: sortType === "A-Z" ? 1 : -1 }
                    : { createdAt: sortType === "old-new" ? 1 : -1 }).select("-__v -updatedAt -createdBy")

            count = await TodoModel.countDocuments({
                $and:
                    [{ createdBy: new mongoose.Types.ObjectId(userId) }, { status: "BIN" }]
            })

            return {
                result, count
            }
        }

        if (filter !== "ALL") {
            result = await TodoModel.find({
                $and: [{ createdBy: new mongoose.Types.ObjectId(userId) }, { status: filter === "ACTIVE" ? "ACTIVE" : "DONE" }]
            }).skip((page - 1) * limit).limit(limit).sort(
                sortType === "A-Z" || sortType === "Z-A" ?
                    { title: sortType === "A-Z" ? 1 : -1 }
                    : { createdAt: sortType === "old-new" ? 1 : -1 }).select("-__v -updatedAt -createdBy")

            count = await TodoModel.countDocuments({
                $and: [{ createdBy: new mongoose.Types.ObjectId(userId) }, { status: filter === "ACTIVE" ? "ACTIVE" : "DONE" }]
            })

            return {
                result, count
            }
        }

        result = await TodoModel.find({
            $and:
                [{ createdBy: new mongoose.Types.ObjectId(userId) }, { status: { $ne: "BIN" } }]
        }).skip((page - 1) * limit).limit(limit).sort(
            sortType === "A-Z" || sortType === "Z-A" ?
                { title: sortType === "A-Z" ? 1 : -1 }
                : { createdAt: sortType === "old-new" ? 1 : -1 }).select("-__v -updatedAt -createdBy")

        count = await TodoModel.countDocuments({
            $and:
                [{ createdBy: new mongoose.Types.ObjectId(userId) }, { status: { $ne: "BIN" } }]
        })

        return {
            result, count
        }
    }

    async edit(query: IPutQuery, data?: IToDo) {
        const { id, action } = query;
        if (action === "complete") {
            return await TodoModel.findByIdAndUpdate({
                _id: id
            }, {
                $set: {
                    status: "DONE"
                }
            })
        } else if (action === "edit") {
            return await TodoModel.findByIdAndUpdate({
                _id: id
            }, {
                $set: data!
            })
        } else if (action === "incomplete") {
            return await TodoModel.findByIdAndUpdate({
                _id: id
            }, {
                $set: {
                    status: "ACTIVE"
                }
            })
        } else {
            return await TodoModel.findByIdAndUpdate({
                _id: id
            }, {
                $set: {
                    status: "BIN"
                }
            })
        }

    }

    async delete(id: string) {
        return await TodoModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    }

    async bulkAction(ids: string[], action: string, userID: string) {
        if (action === "bin") {
            return await TodoModel.updateMany({ $and: [{ _id: { $in: ids } }, { createdBy: new mongoose.Types.ObjectId(userID) }] }, {
                $set: {
                    status: "BIN"
                }
            })
        }

        return await TodoModel.updateMany({ _id: { $in: ids } }, {
            $set: {
                status: "DONE"
            }
        })

    }

}
export default new ToDoService();
