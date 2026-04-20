import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../config/database';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const vocabulary = await prisma.vocabulary.findMany({
      orderBy: { word: 'asc' }
    });
    res.json({ status: 'success', data: vocabulary });
  } catch (error) {
    next(error);
  }
});

router.post('/mastery', authenticate, async (req, res, next) => {
    try {
        const { vocabId, isCorrect } = req.body;
        const userId = (req as any).user.id;

        const currentProgress = await prisma.flashcardProgress.findUnique({
            where: { userId_vocabId: { userId, vocabId } }
        });

        let newInterval = isCorrect ? (currentProgress?.interval || 1) * 2 : 1;
        if (newInterval > 30) newInterval = 30; // Max 1 month

        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + newInterval);

        const progress = await prisma.flashcardProgress.upsert({
            where: { userId_vocabId: { userId, vocabId } },
            update: {
                interval: newInterval,
                nextReview,
                mastery: isCorrect ? Math.min((currentProgress?.mastery || 0) + 0.2, 1) : Math.max((currentProgress?.mastery || 0) - 0.3, 0)
            },
            create: {
                userId,
                vocabId,
                interval: newInterval,
                nextReview,
                mastery: isCorrect ? 0.2 : 0
            }
        });

        res.json({ status: 'success', data: progress });
    } catch (error) {
        next(error);
    }
});

export default router;
