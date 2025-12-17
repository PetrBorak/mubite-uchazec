import { AppError } from './AppError';

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(
    message = 'Validation Error',
    public readonly errors?: unknown
  ) {
    super(message, 422);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}

export class ExternalServiceError extends AppError {
  constructor(
    message = 'External Service Error',
    public readonly service?: string
  ) {
    super(message, 502);
  }
}
