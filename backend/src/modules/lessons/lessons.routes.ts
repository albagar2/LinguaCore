import { Router } from 'express';
import prisma from '../../config/database';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: { exercises: true }
    });
    res.json({ status: 'success', data: lessons });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: { exercises: true }
    });
    if (!lesson) res.status(404).json({ message: 'Lesson not found' });
    else res.json({ status: 'success', data: lesson });
  } catch (error) {
    next(error);
  }
});

export default router;
