import { Router } from 'express';
import * as TaskControllers from '@controllers';
import { isAuthenticated } from '@middlewares';
import { titleValidators } from '@validators';

const router = Router();

router.get('/:id', isAuthenticated, TaskControllers.getTask);
router.get('/', isAuthenticated, TaskControllers.getTasks);
router.post(
  '/',
  isAuthenticated,
  [titleValidators],
  TaskControllers.createTask
);
router.patch(
  '/:id',
  isAuthenticated,
  [titleValidators],
  TaskControllers.updateTask
);
router.delete('/:id', isAuthenticated, TaskControllers.deleteTask);

export default router;
