import winston from 'winston';
import {Request, Response, NextFunction} from 'express';

// Define Winston logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export const loggerMiddleware = (req:Request, res:Response, next:NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};
