import {Request, Response} from 'express';
import _ from 'lodash';

import {createUser, getAllUser, getUser} from '../services/user.service';
import {LogUser, NewUser} from '../types';
import {HttpException} from '../utils/exception';
import {createUserCreditAccount, findAccount} from '../services/credits.service';

export const Register = async(req:Request, res:Response) => {
  const body:NewUser = req.body;
  const isCreated = await createUser(body);
  if(isCreated instanceof Error) {
    res.status(400).json({
      error:isCreated.message
    });
    return;
  }
  const walletCreated = await createUserCreditAccount(isCreated.id);
  if(walletCreated instanceof Error) {
    res.status(400).json({
      error:walletCreated.message
    });
    return;
  }

  res.status(201).json(_.omit(isCreated, 'password'));
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
  const fetchUserAccount = await findAccount(loggedUser.id);
  if(fetchUserAccount instanceof Error) {
    res.status(400).json({
      error:fetchUserAccount.message
    });
    return;
  }


  res.status(200).json({
    ...loggedUser,
    walletId:fetchUserAccount.id,
    walletBalance:fetchUserAccount.amount,
    lastUpdated:fetchUserAccount.updatedAt
  });
}


export const fetchAllUsers = async(req:Request, res:Response) => {
  const allAppuser = await getAllUser();
  if(allAppuser instanceof Error) {
    res.status(400).json({
      error:allAppuser.message
    });
    return;
  }

  res.status(200).json({
    user:allAppuser
  })
}