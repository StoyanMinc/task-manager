import { Router } from 'express';
import { protect } from '../middlewares/protect.js';
import {
    createTask,
    deleteTask,
    getSingleTask,
    getUserTasks,
    updateTask

} from '../controllers/taskController.js';

const taskRouter = Router();

taskRouter.post('/create', protect, createTask);
taskRouter.get('/', protect, getUserTasks);
taskRouter.get('/:taskId', protect, getSingleTask);
taskRouter.delete('/:taskId', protect, deleteTask);
taskRouter.put('/:taskId', protect, updateTask);

export default taskRouter;