import dotenv from 'dotenv';
import { createApp } from './app';
import { config } from './config';
import { logger } from './utils/logger';

dotenv.config();

const app = createApp();

const server = app.listen(config.port, () => {
  logger.info(`Server started successfully`, {
    port: config.port,
    environment: config.nodeEnv,
    url: `http://localhost:${config.port}`,
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Rejection', {
    error: reason.message,
    stack: reason.stack,
  });
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});
