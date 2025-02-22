import dotenv from 'dotenv';
import { Config } from '@/types/config';

dotenv.config();

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret:
    process.env.JWT_SECRET || 'd42e1160fc80b10e763e8d102b56947c9e02d343db9e0',
  environment: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  bcryptSaltRounds: 10,
};
