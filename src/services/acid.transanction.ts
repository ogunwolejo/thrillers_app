import { withAccelerate } from '@prisma/extension-accelerate';
import {CreditAccount, PrismaClient} from '@prisma/client';
import {updateUserCreditBalance} from './credits.service';
import {createTransactions} from './transactions.service';

const prisma = new PrismaClient().$extends(withAccelerate());

interface Transfers {
  updatedSender:CreditAccount;
  updatedReceiver:CreditAccount;
}

// amountReducted is the new amount for the sender after the crdit + tax is removed calc amountReducted = tax + amountSending
// amountedAdded is the amount + money sent calc amountedAdded - curreentBalance + new amount
const transferUserCredit = async (senderId: string, senderWalletId:string, receiverId: string, receiverWalletId:string, amountReducted: number, amountedAdded:number, tax:number):Promise<Error | Transfers>  => {
  try {
    let transactionResult;
    const result = await prisma.$transaction(async (prisma):Promise<Transfers> => {
      // Deduct amount from sender's balance
      const updatedSender = await updateUserCreditBalance(senderWalletId, /*senderId,*/ amountReducted);
      if(updatedSender instanceof Error) {
        throw new Error('Error in 1 transanction')
      }

      // Add amount to receiver's balance
      const updatedReceiver = await updateUserCreditBalance(receiverWalletId, /*receiverId,*/ amountedAdded);
      if(updatedReceiver instanceof Error) {
        throw new Error('Error in 2 transanction')
      }

      // Create transaction record
      await createTransactions({
        amount:amountReducted,
        tax:amountedAdded - amountReducted,
        senderId,
        receiverId
      })

      transactionResult = { updatedSender, updatedReceiver }
      console.log(transactionResult)
      return transactionResult;

    });

    return result;

  } catch (e) {
    return (e as Error)
  }


}

export default transferUserCredit;