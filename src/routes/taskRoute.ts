import { Router } from 'express';
import * as TaskController from '@controllers';
import { isAuthenticated } from '@middlewares';
import { titleValidators } from '@validators';

const router = Router();

router.use(isAuthenticated);
router.get('/:id', TaskController.getTask);
router.get('/', TaskController.getTasks);
router.post('/', [titleValidators], TaskController.createTask);
router.patch('/:id', [titleValidators], TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;
