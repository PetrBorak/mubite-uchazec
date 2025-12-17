import { Router } from 'express';
import { GetAlbumsQuerySchema, GetAlbumParamsSchema } from '../schemas';
import { albumController } from '../controllers';
import { asyncHandler, validate } from '../middleware';

const router = Router();

router.get(
  '/',
  validate(GetAlbumsQuerySchema, 'query'),
  asyncHandler(albumController.getAlbums.bind(albumController))
);

router.get(
  '/:id',
  validate(GetAlbumParamsSchema, 'params'),
  asyncHandler(albumController.getAlbumById.bind(albumController))
);

export { router as albumRoutes };
