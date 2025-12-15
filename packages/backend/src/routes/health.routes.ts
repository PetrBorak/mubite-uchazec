import { Router } from 'express';
import { healthController } from '../controllers';

const router = Router();

router.get('/', healthController.getHealth.bind(healthController));

export { router as healthRoutes };
