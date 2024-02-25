import { withAccelerate } from '@prisma/extension-accelerate';
import {CreditAccount, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient().$extends(withAccelerate());

export const createUserCreditAccount = async(userId:string):Promise<CreditAccount | Error> => {
  try {
    const createCredAccount:CreditAccount = await prisma.creditAccount.create({
      data:{
        userId
      }
    })
    if(!createCredAccount) {
      throw new Error('Unable to create user credit account');
    }
    return createCredAccount
  } catch (e) {
    return (e as Error);
  }
}

export const findAccount = async(userId:string):Promise<CreditAccount | Error> => {
  try {
    const account:CreditAccount | null = await prisma.creditAccount.findFirst({
      where:{
        userId
      }
    })

    if(!account) {
      throw new Error('Account was not found');
    }
    return account;

  } catch (e) {
    return (e as Error);
  }
}

export const updateUserCreditBalance = async(accountId:string, /*userId:string,*/ newAmount:number):Promise<CreditAccount | Error> => {
  try {
    const updateAccont:CreditAccount = await prisma.creditAccount.update({
      where:{
        id:accountId,
        //userId:userId
      },
      data:{
        amount:newAmount,
      },
    })
    return updateAccont;
  } catch (e) {
    console.log('###', e)
    return (e as Error);
  }
}