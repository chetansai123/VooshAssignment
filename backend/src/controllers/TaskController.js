import mongoose from "mongoose";
import * as TaskService from "../services/TaskService.js";

export const getTasks = async (req, res, next) => {
    const tasks = await TaskService.getTasks();
    if (tasks?.length > 0) {
        res.status(200).json(tasks);
    } else {
        res.status(404);
        throw new Error('Tasks not Found!!!');
    }
    next();
};

export const addTask = async (req, res, next) => {
    const { title, description, status } = req.body;
    const taskObj = await TaskService.addTask(title, description, status);
    if (taskObj) {
        res.status(200).json(taskObj);
    } else {
        res.status(404);
        throw new Error('Task not Added!!!');
    }
    next();
};

export const updateTask = async (req, res, next) => {
    const { _id: id, title, description, status } = req.body;
    const taskObj = await TaskService.updateTask(id, title, description, status);
    if (taskObj) {
        res.status(200).json(taskObj);
    } else {
        res.status(400);
        throw new Error('Task not Updated!');
    }
    next();
};

export const deleteTask = async (req, res, next) => {
    const { id } = req.body;
    const deletedTask = await TaskService.deleteTask(id);
    if (deletedTask) {
        res.status(200).json({ id: deletedTask._id, success: true });
    } else {
        res.status(400);
        throw new Error('Task not Found!');
    }
    next();
};
