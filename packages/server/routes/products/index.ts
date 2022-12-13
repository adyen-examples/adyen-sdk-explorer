import { Router } from 'express';
import { products } from '../../models';

const router = Router();

router.get('/', (req, res) => {
  try {
    return res.status(201).json({ products });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
