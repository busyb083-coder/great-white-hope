import { Router, Request, Response } from 'express';

const router = Router();

// Get all media
router.get('/', (req: Request, res: Response) => {
  res.json({ media: [] });
});

// Upload media
router.post('/upload', (req: Request, res: Response) => {
  res.json({ message: 'Media uploaded' });
});

export default router;
