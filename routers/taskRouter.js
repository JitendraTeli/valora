import Router from 'express'
import {protect,authorize} from '../middlewares/authMiddleware.js'
import { makeTask,deleteTask,updateStatus,taskList,myTasks} from '../controllers/taskController.js';


const router = Router();

router.get("/tasks/user",protect,myTasks);
router.get("/tasks",protect,authorize("admin"),taskList);
router.post("/task",protect,authorize("admin"),makeTask);
router.put("/status",updateStatus);
router.delete("/task/:id",protect,authorize("admin"),deleteTask);


export default router