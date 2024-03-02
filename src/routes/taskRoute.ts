import { Router } from 'express';
import * as TaskController from '@controllers';
import { isAuthenticated, validateMongoId } from '@middlewares';
import { titleValidators } from '@validators';

const router = Router();

router.use(isAuthenticated);
router.get('/:id', validateMongoId, TaskController.getTask);
router.get('/', TaskController.getTasks);
router.post('/', [titleValidators], TaskController.createTask);
router.patch(
  '/:id',
  [titleValidators],
  validateMongoId,
  TaskController.updateTask
);
router.delete('/:id', validateMongoId, TaskController.deleteTask);

export default router;
