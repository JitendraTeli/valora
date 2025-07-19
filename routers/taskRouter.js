import Router from 'express'
import {protect,authorize} from '../middlewares/authMiddleware.js'
import { makeTask,deleteTask,updateStatus,taskList,myTasks} from '../controllers/taskController.js';


const router = Router();

router.get("/tasks",taskList);
router.post("/task",makeTask);
router.put("/status",updateStatus);
router.delete("/task/:id",deleteTask);
router.get("/tasks/:id",myTasks);


export default router