import {Request, Response, NextFunction} from 'express';
import {fetchTax, updateTax} from '../services/tax.service';
import {HttpException} from '../utils/exception';

export const fetchTaxValue = async(req:Request, res:Response, next:NextFunction) => {
  const value = await fetchTax();
  if(value instanceof Error) {
    new HttpException(400, value.message);
    return;
  }

  res.status(200).json(value);
}

export const changeTaxConfig = async(req:Request, res:Response, next:NextFunction) => {
  const {taxId, amount} = req.body;
  const value = await updateTax(taxId, amount);
  if(value instanceof Error) {
    new HttpException(400, value.message);
    return;
  }

  res.status(200).json(value);
}
