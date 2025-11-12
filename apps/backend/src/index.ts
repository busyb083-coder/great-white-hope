import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { logger } from './lib/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import pagesRoutes from './routes/pages.js';
import mediaRoutes from './routes/media.js';
import productsRoutes from './routes/products.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app: Express = express();
const PORT = process.env.PORT || 4000;

// ============================================================================
// Initialize Sentry
// ============================================================================
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  });
}

// ============================================================================
// Middleware
// ============================================================================

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging
app.use(requestLogger);

// Sentry request handler
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.requestHandler());
}

// ============================================================================
// Routes
// ============================================================================

// Health checks
app.use('/health', healthRoutes);
app.use('/readiness', healthRoutes);

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pages', pagesRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/products', productsRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Great White Hope API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

// Sentry error handler
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Global error handler
app.use(errorHandler);

// ============================================================================
// Server startup
// ============================================================================

const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
