import createError from 'http-errors';
import { IGetQuery, IPutQuery, IToDo, IDeleteQuery } from './../types/Todo.d';
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import TodoService from '../service/todo-service';
import TodoModel from '../model/TodoModel';
import mongoose, { Schema } from 'mongoose';
import { IRequestType } from '../types/Middleware';

class ToDoController {
    async create(req: IRequestType, res: Response, next: NextFunction) {
        try {
            const validationSchema = Joi.object<IToDo>({
                title: Joi.string().required().max(50).trim().disallow(""),
                description: Joi.string().required().max(256).trim().disallow(""),
                status: Joi.string().default("ACTIVE").valid('ACTIVE', "DONE", "BIN").optional(),
            })

            const { error, value } = validationSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const isExists = await TodoModel.findOne({ title: value.title })
            if (isExists) {
                return next(createError(409, "Title Already Exists"))
            }

            value.createdBy = req.user!._id;
            const result = await TodoService.create(value)
            return res.status(200).json({
                success: true,
                data: result
            })


        } catch (error) {
            return next(error)
        }
    }

    async get(req: IRequestType, res: Response, next: NextFunction) {
        try {
            const validationSchema = Joi.object<IGetQuery>({
                limit: Joi.number().required().disallow(0),
                page: Joi.number().required().disallow(0),
                sortType: Joi.string().valid("A-Z", "Z-A", "old-new", "new-old").required().disallow(""),
                filter: Joi.string().valid("ALL", "COMPLETED", "ACTIVE", "BIN").required().disallow(""),
                keyword: Joi.string().optional().allow("")
            })

            const { error, value } = validationSchema.validate(req.query)
            if (error) {
                return next(error)
            }

            const data = await TodoService.get(value, req.user!._id as string)
            return res.status(200).json({
                success: true,
                data: data.result,
                count: data.count
            })

        } catch (error) {
            return next(error)
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const validationSchema = Joi.object<IPutQuery>({
                id: Joi.string().required().disallow(""),
                action: Joi.string().valid("edit", "bin", "complete", "incomplete").required().disallow("")
            })

            const { error, value } = validationSchema.validate(req.query)
            if (error) {
                return next(error)
            }
            const isExists = await TodoModel.findById(new mongoose.Types.ObjectId(value.id))
            if (!isExists) {
                return next(createError(409, "Invalid todo"))
            }

            const query = value;

            if (value.action === "edit") {
                const todoSchema = Joi.object<IToDo>({
                    title: Joi.string().required().max(50).trim().disallow(""),
                    description: Joi.string().required().max(256).trim().disallow(""),
                    status: Joi.string().default("ACTIVE").valid('ACTIVE', "DONE", "BIN").optional(),
                })

                const { error, value } = todoSchema.validate(req.body)
                if (error) {
                    return next(error)
                }
                const isExists = await TodoModel.findOne({ title: value.title })
                if (isExists) {
                    return next(createError(409, "Title Already Exists"))
                }
                const data = value;

                const result = await TodoService.edit(query, data)
                return res.status(200).json({
                    success: true,
                    data: result
                })
            }

            const result = await TodoService.edit(query)
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (error) {
            return next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const validationSchema = Joi.object<IDeleteQuery>({
                id: Joi.string().required().disallow(""),
            })

            const { error, value } = validationSchema.validate(req.params)
            if (error) {
                return next(error)
            }
            const isExists = await TodoModel.findById(new mongoose.Types.ObjectId(value.id))
            if (!isExists) {
                return next(createError(409, "Invalid todo"))
            }

            const result = await TodoService.delete(value.id)
            return res.status(200).json({
                success: true,
                message: "Todo list deleted successfully"
            })
        } catch (error) {
            return next(error)
        }
    }

    async bulkAction(req: IRequestType, res: Response, next: NextFunction) {
        try {
            const validationSchema = Joi.object({
                ids: Joi.array().items(Joi.string()).required().disallow(""),
                action: Joi.string().required().disallow("")
            })

            const { error, value } = validationSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const userID = req.user?._id!;
            const result = await TodoService.bulkAction(value.ids, value.action, userID)

            return res.status(200).json({
                success: true,
                message: result
            })

        } catch (error) {
            return next(error)
        }
    }
}

export default new ToDoController();