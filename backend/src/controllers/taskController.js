import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'Title is required!' });
        }

        const newTask = await Task.create({
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status,
            owner: req.user._id
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.log('ERROR CREATING TASK:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getUserTasks = async (req, res) => {
    try {
        const userTasks = await Task.find({ owner: req.user._id });
        res.status(200).json(userTasks);
    } catch (error) {
        console.log('ERROR GETTING USER TASKS:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getSingleTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'No task found!' });
        }
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view this task!' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.log('ERROR GETTING SINGLE TASK:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const { title, description, dueDate, priority, status, completed } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this task!' });
        }
        // update task
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed || task.completed;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.log('ERROR UPDATE TASK:', error.message);
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this task!' });
        }
        await task.deleteOne();
        res.status(200).json({ message: 'Task deleted successfully!' });
    } catch (error) {
        console.log('ERROR DELETE TASK:', error);
        res.status(400).json({ message: error.message });
    }
};