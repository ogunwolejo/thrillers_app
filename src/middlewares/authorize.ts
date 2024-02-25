import {Request, Response, NextFunction} from 'express';
import {verifyToken} from '../utils/token';
import {HttpException} from '../utils/exception';

interface AuthenticatedRequest extends Request {
  user?: any; // Define the user property
}

export const Authorization = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
  const authHeader  = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = verifyToken(token);
    if(typeof decoded  === 'string') {
      new HttpException(401, 'verification failed, try again');
      return;
    }
    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

