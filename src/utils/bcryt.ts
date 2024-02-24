import {hashSync, genSaltSync, compare} from 'bcryptjs';

export const hashPassword = (password:string):string => {
  const salt:string = genSaltSync(10)
  return hashSync(password, salt)
}

export const comparePassword = async(inputtedPassword:string, hashedPassword:string):Promise<boolean> => {
  return compare(inputtedPassword, hashedPassword);
}