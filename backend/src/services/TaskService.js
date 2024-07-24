import { Task } from "../models/index.js";

export const getTasks = async () => {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return tasks;
};

export const addTask = async (title, description, status = 'To Do') => {
    const doc = { title, description, status };
    const taskObj = new Task(doc);
    const insertedTask = await taskObj.save();
    return insertedTask;
};

export const updateTask = async (id, title, description, status) => {
    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set: { title, description, status } },
        { new: true, runValidators: true }
    );
    return updatedTask;
};

export const deleteTask = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
};
