import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors';

type ValidationTarget = 'params' | 'query' | 'body';

export const validate = (schema: ZodSchema, target: ValidationTarget = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[target];
      const validated = await schema.parseAsync(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any)[target] = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        next(new ValidationError('Validation failed', errors));
      } else {
        next(error);
      }
    }
  };
};
