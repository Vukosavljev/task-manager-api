import { Router } from 'express';
import * as TaskControllers from '../controllers';
import { isAuthenticated } from '../middlewares';

const router = Router();

router.get('/:id', TaskControllers.getTask);
router.get('/', TaskControllers.getTasks);
router.post('/', isAuthenticated, TaskControllers.createTask);
router.patch('/:id', TaskControllers.updateTask);
router.delete('/:id', TaskControllers.deleteTask);

export default router;
