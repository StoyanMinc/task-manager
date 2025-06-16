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
        res.status(500).json({ message: 'Internal server error' });
    }
};