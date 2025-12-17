import { Router } from 'express';
import { albumRoutes } from './album.routes';
import { healthRoutes } from './health.routes';

const router = Router();

// Health check endpoint (not versioned)
router.use('/health', healthRoutes);

// API v1 routes
const v1Router = Router();
v1Router.use('/albums', albumRoutes);

router.use('/api/v1', v1Router);

// Redirect /api/albums to /api/v1/albums for backward compatibility
router.use('/api/albums', (req, res) => {
  const newUrl = `/api/v1/albums${req.url}`;
  res.redirect(308, newUrl);
});

export { router as routes };
