import { withAccelerate } from '@prisma/extension-accelerate'
import {LogUser, NewUser} from '../types';
import {User, PrismaClient} from '@prisma/client';
import {comparePassword, hashPassword} from '../utils/bcryt';
import {generateToken} from '../utils/token';

const prisma = new PrismaClient().$extends(withAccelerate());

export const createUser = async(user:NewUser):Promise<User | Error> => {
  try {
    const {email, password, name, mobile} = user;
    const hash:string = hashPassword(password);
    const newUser:User = await prisma.user.create({
      data:{
        name,
        email,
        mobile,
        password:hash
      }
    });
    if(!newUser) {
      throw new Error('Unable to create user account');
    }
    return newUser;
  } catch (e) {
    console.log(e);
    return (e as Error);
  }
}

export const getUser = async(user:LogUser) => {
  try {
    const findUser = await prisma.user.findUnique({
      where:{
        email:user.email
      }
    })
    if(!findUser) {
      throw new Error('User credential not found!');
    }
    const isPasswordCorrect:boolean = await comparePassword(user.password, findUser.password);
    // check the password correspond with each other
    if(!isPasswordCorrect) {
      throw new Error('Password is incorrect');
    }

    const token = generateToken(findUser.id.toString());
    return {
      ...findUser,
      token
    }
  } catch (e) {
    return (e as Error);
  }
}