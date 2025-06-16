import express from 'express';
import userRouter from './routes/user-router.js';
import adminRouter from './routes/admin-router.js';
import taksRouter from './routes/task-router.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/tasks', taksRouter);



export default router;