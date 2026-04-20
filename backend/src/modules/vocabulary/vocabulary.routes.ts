import { Router } from 'express';
import prisma from '../../config/database';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const vocabulary = await prisma.vocabulary.findMany({
      orderBy: { word: 'asc' }
    });
    res.json({ status: 'success', data: vocabulary });
  } catch (error) {
    next(error);
  }
});

export default router;
