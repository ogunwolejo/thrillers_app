import {Request, Response, NextFunction} from 'express';
import {findAccount} from '../services/credits.service';
import {HttpException} from '../utils/exception';
import transferUserCredit from '../services/acid.transanction';

export const getCreditAccountBalance = async(req:Request, res:Response, next:NextFunction) => {
  const {userId} = req.body;
  const account = await findAccount(userId)
  if(account instanceof  Error) {
    new HttpException(500, account.message);
    return;
  }

  return res.status(200).json(account);
}


export const transferCredits = async(req:Request, res:Response, next:NextFunction) =>  {
  const {
    senderId,
    senderWallerId,
    receiverId,
    receiverWalletId,
    amountReducted,
    amountedAdded,
    tax,
  } = req.body;

  transferUserCredit(senderId, senderWallerId, receiverId, receiverWalletId, amountReducted, amountedAdded, tax)
    .then(result => {
      if(result instanceof Error) {
        throw result;
      }
      console.log('@@@@', result)
      res.status(200).json(result);
    })
    .catch(e => {
      console.log('@@@@ error', e)
      res.status(400).json({
        error:e.message
      })
    })
}