import {Request, Response, NextFunction} from 'express';
import {getAllTransactionsForId} from '../services/transactions.service';
import {HttpException} from '../utils/exception';


export const fetchAllTransanctions = async(req:Request, res:Response, next:NextFunction) => {
  const {userId} = req.body;
  const allTransanctions = await getAllTransactionsForId(userId);
  if(allTransanctions instanceof Error) {
    new HttpException(400, allTransanctions.message);
    return;
  }

  res.status(200).json(allTransanctions);
}