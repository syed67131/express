import express from 'express';
const router = express.Router();
import tasksController from './tasks.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/add',authMiddleware,(req,res)=>{
    tasksController.createTask(req,res);
});

//Edit Route req,res
//     /edit/:taskId


export default router;