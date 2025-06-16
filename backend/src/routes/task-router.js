import { Router } from 'express';
import { protect } from '../middlewares/protect.js';
import { createTask } from '../controllers/taskController.js';

const taksRouter = Router();

taksRouter.post('/create', protect, createTask);


export default taksRouter;