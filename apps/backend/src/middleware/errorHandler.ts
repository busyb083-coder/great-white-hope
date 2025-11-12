import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      path: req.path,
    });
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      statusCode: err.statusCode,
    });
  }

  logger.error({
    error: err.message,
    stack: err.stack,
    path: req.path,
  });

  res.status(500).json({
    error: 'Internal Server Error',
    statusCode: 500,
  });
};
