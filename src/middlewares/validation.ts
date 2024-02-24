import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const UserRegistrationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().pattern(/^\+[1-9]\d{1,14}$/)
});

const UserLoginSchema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email().required()
});

export const validateRegBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = UserRegistrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = UserLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
