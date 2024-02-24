import {Request, Response} from 'express';
import {createUser, getUser} from '../services/user.service';
import {LogUser, NewUser} from '../types';
import {HttpException} from '../utils/exception';

export const Register = async(req:Request, res:Response) => {
  const body:NewUser = req.body;
  const isCreated = await createUser(body);
  if(isCreated instanceof Error) {
    res.statusCode = 201;
    res.json({
      error:isCreated.message
    });
  }
  res.status(201).json(isCreated);
}

export const Login = async(req:Request, res:Response) => {
  const body:LogUser = req.body;
  const loggedUser = await getUser(body);
  if(loggedUser instanceof Error) {
    res.status(400).json({
      error:loggedUser.message
    });
    return;
  }
  res.status(200).json(loggedUser);
}