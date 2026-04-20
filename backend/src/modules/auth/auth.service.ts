import prisma from '../../config/database';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { AppError } from '../../middleware/errorHandler';

export const register = async (data: any) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    const error: AppError = new Error('Email already in use');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await argon2.hash(data.password);
  
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      level: true,
    },
  });

  return user;
};

export const login = async (data: any) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await argon2.verify(user.password, data.password))) {
    const error: AppError = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      level: user.level,
    },
  };
};
