import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../../config/database';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/dashboard', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        
        // 1. Weekly XP History (Calculated from Progress)
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setHours(0,0,0,0);
            d.setDate(d.getDate() - i);
            return d;
        }).reverse();

        const weeklyXp = await Promise.all(last7Days.map(async (date) => {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);
            
            const progressForDay = await prisma.progress.findMany({
                where: {
                    userId,
                    updatedAt: {
                        gte: date,
                        lt: nextDay
                    }
                },
                select: { score: true }
            });
            
            return progressForDay.reduce((sum, p) => sum + p.score, 0);
        }));

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
