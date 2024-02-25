import {Transaction} from '@prisma/client';

export interface NewUser {
  name:string;
  mobile?:string;
  email:string;
  password:string;
}

export interface LogUser {
  email:string;
  password:string;
}

export interface TransactionPayload {
  amount: number;
  receiverId : string;
  tax: number;
  senderId: string;
}

export interface AllTransaction {
  transactionsSender:Transaction[],
  transactionsReceiver:Transaction[]
}