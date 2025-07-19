import Router from 'express';
import {login,register,userList,changePassword,changeRole} from '../controllers/userController.js'
import {protect,authorize} from '../middlewares/authMiddleware.js';


const router = Router();



router.post('/login',login);
router.post('/register',register);

router.put('/password',protect,changePassword);

router.get('/users',protect,authorize("admin","manager"),userList);
router.put('/role/:id',protect,authorize("admin"),changeRole);


export default router;