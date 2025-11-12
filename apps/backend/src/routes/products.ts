import { Router, Request, Response } from 'express';

const router = Router();

// Get all products
router.get('/', (req: Request, res: Response) => {
  res.json({ products: [] });
});

// Get product by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ product: null });
});

// Create product
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Product created' });
});

// Update product
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Product updated' });
});

// Delete product
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Product deleted' });
});

export default router;
