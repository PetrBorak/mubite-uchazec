import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config';
import { routes } from './routes';
import { errorHandler } from './middleware';
import { NotFoundError } from './errors';
import { logger } from './utils/logger';

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  if (config.isDevelopment) {
    app.use((req: Request, res: Response, next: NextFunction) => {
      logger.debug(`${req.method} ${req.path}`, {
        query: req.query,
        params: req.params,
      });
      next();
    });
  }

  app.use('/', routes);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route ${req.method} ${req.path} not found`));
  });

  app.use(errorHandler);

  return app;
}
