import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:type', authenticate, authorize(['ADMIN']), async (req, res, next) => {
  try {
    const { type } = req.params;
    let fileName = '';
    
    if (type === 'user') fileName = 'USER_MANUAL.md';
    else if (type === 'dev') fileName = 'DEV_MANUAL.md';
    else return res.status(400).json({ message: 'Invalid doc type' });

    const filePath = path.join(__dirname, '../../../../docs', fileName);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Document not found' });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ status: 'success', data: content });
  } catch (error) {
    next(error);
  }
});

export default router;
