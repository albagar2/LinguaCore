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
      where: { id: req.params.id as string },
      include: { exercises: true }
    });
    if (!lesson) res.status(404).json({ message: 'Lesson not found' });
    else res.json({ status: 'success', data: lesson });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/complete', authenticate, async (req: any, res, next) => {
  try {
    const { score } = req.body;
    const userId = req.user.id;
    const lessonId = req.params.id;

    // 1. Update/Create Progress and calculate XP delta
    const existingProgress = await prisma.progress.findUnique({
      where: { userId_lessonId: { userId, lessonId } }
    });

    const oldScore = existingProgress?.score || 0;
    const xpDelta = Math.max(0, score - oldScore);

    await prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { completed: true, score: Math.max(oldScore, score) },
      create: { userId, lessonId, completed: true, score }
    });

    // 2. Update User XP and Streak
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let newStreak = user.streak;
    const now = new Date();
    const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;

    if (!lastLogin) {
      newStreak = 1;
    } else {
      const diffTime = Math.abs(now.getTime() - lastLogin.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpDelta },
        streak: newStreak,
        lastLogin: now
      }
    });

    res.json({ 
      status: 'success', 
      data: { 
        xp: updatedUser.xp, 
        streak: updatedUser.streak 
      } 
    });
  } catch (error) {
    next(error);
  }
});

export default router;
