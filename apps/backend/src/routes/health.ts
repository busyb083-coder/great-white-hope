import { Router, Request, Response } from 'express';
import { logger } from '../lib/logger.js';

const router = Router();

// Health check endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Readiness check endpoint
router.get('/ready', (req: Request, res: Response) => {
  res.json({
    ready: true,
    timestamp: new Date().toISOString(),
  });
});

export default router;
