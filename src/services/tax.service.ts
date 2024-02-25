import { withAccelerate } from '@prisma/extension-accelerate';
import {PrismaClient, Tax} from '@prisma/client';

const prisma = new PrismaClient().$extends(withAccelerate());

export const fetchTax = async():Promise<Tax | Error> => {
  try {
    const value:Tax|null = await prisma.tax.findFirst();
    if(!value) {
      throw new Error('Tax value not found')
    }

    return value
  } catch (e) {
    return (e as Error);
  }
}


export const updateTax = async(taxId:string, value:number):Promise<Tax | Error> => {
  try {
    const result:Tax = await prisma.tax.update({
      where:{
        id:taxId
      },
      data:{
        value
      }
    });
    if(!result) {
      throw new Error('Tax value not updated')
    }

    return result
  } catch (e) {
    return (e as Error);
  }
}