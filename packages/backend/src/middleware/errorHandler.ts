import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { logger } from '../utils/logger';

interface ErrorResponse {
  status: 'error';
  message: string;
  errors?: unknown;
  stack?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, _: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: unknown = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    if ('errors' in err) {
      errors = err.errors;
    }
  }

  if (statusCode === 500) {
    logger.error('Internal Server Error', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      body: req.body,
    });
  } else if (statusCode >= 400) {
    logger.warn('Client Error', {
      statusCode,
      message,
      url: req.url,
      method: req.method,
      errors,
    });
  }

  const response: ErrorResponse = {
    status: 'error',
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
