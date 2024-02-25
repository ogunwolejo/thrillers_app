import { withAccelerate } from '@prisma/extension-accelerate';
import {Transaction, PrismaClient} from '@prisma/client';
import {AllTransaction, TransactionPayload} from '../types';

const prisma = new PrismaClient().$extends(withAccelerate());

export const createTransactions = async(payload:TransactionPayload):Promise<Transaction | Error> => {
  try {
    const {senderId, receiverId, amount, tax} = payload;
    const transactionsCreated:Transaction = await prisma.transaction.create({
      data:{
        receiverId,
        senderId,
        amount,
        tax
      }
    })
    return transactionsCreated;
  } catch (e) {
    return (e as Error);
  }
}

const sendingTransactions = async(userId:string):Promise<Transaction[] | Error> => {
  try {
    const result:Transaction[] = await prisma.transaction.findMany({
      where:{
        senderId:userId
      }
    })
    return result
  } catch (e) {
    return (e as Error);
  }
}

const receiverTransactions = async(userId:string):Promise<Transaction[] | Error> => {
  try {
    const result:Transaction[] = await prisma.transaction.findMany({
      where:{
        receiverId:userId
      }
    })
    return result
  } catch (e) {
    return (e as Error);
  }
}

export const getAllTransactionsForId = async(userId:string):Promise<AllTransaction | Error> => {
  try {
    const [transactionsForSending, transactionsForReceiving] = await Promise.all([sendingTransactions(userId),  receiverTransactions((userId))]);
    if (transactionsForReceiving instanceof Error) {
      throw transactionsForReceiving
    } else if (transactionsForSending instanceof Error) {
      throw transactionsForSending;
    }
    const allTransactions:AllTransaction = {
      transactionsReceiver:transactionsForReceiving,
      transactionsSender:transactionsForSending
    }
    return allTransactions;
  } catch (e) {
    return (e as Error);
  }
}