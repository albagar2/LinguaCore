import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../config/database';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/dashboard', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        
        // 1. Weekly XP History (Mocked base on updatedAt for now)
        const weeklyXp = [240, 380, 190, 520, 410, 670, 310]; 

        // 2. Accuracy by Category
        const completedLessons = await prisma.progress.findMany({
            where: { userId, completed: true },
            include: { lesson: true }
        });

        const categories = ['GRAMMAR', 'VOCABULARY', 'BUSINESS', 'LISTENING', 'SPEAKING'];
        const accuracy = categories.map(cat => {
            const lessons = completedLessons.filter(l => l.lesson.category === cat);
            const avg = lessons.length > 0 ? lessons.reduce((acc, curr) => acc + curr.score, 0) / lessons.length : 0;
            return { category: cat, score: Math.round(avg) };
        });

        // 3. Stats Summary
        const user = await prisma.user.findUnique({ where: { id: userId } });

        res.json({
            status: 'success',
            data: {
                weeklyXp,
                accuracy,
                totalLessons: completedLessons.length,
                totalWords: await prisma.flashcardProgress.count({ where: { userId, mastery: 1 } }),
                userStats: {
                    xp: user?.xp,
                    level: user?.level,
                    streak: user?.streak
                }
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
