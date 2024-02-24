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

const findAccount = async(userId:string):Promise<CreditAccount | Error> => {
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

export const updateUserCreditBalance = async(userId:string, newAmount:string) => {
  try {
    const updateAccont = await prisma.creditAccount.update({
      where:{
        userId
      },
      data:{
        amount:newAmount,
      },
    })
  } catch (e) {
    return (e as Error);
  }
}