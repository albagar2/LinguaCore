import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { loginSchema, registerSchema } from './auth.schema';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await authService.register(validatedData);
    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData);
    res.status(200).json({ status: 'success', ...result });
  } catch (error) {
    next(error);
  }
};

export const getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await authService.getLeaderboard();
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    next(error);
  }
};
