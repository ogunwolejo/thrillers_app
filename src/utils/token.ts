import {JwtPayload, sign, verify} from 'jsonwebtoken';

export const generateToken = (payload:string):string => {
  const secret:string = process.env.SECRET!;
  const token:string = sign({id:payload}, secret, {
    algorithm:'HS256',
    expiresIn:3600 * 24 * 2
  })
  return token;
}

export const verifyToken = (token:string):JwtPayload | string => {
  const secret:string = process.env.SECRET!;
  return verify(token, secret, {
    ignoreExpiration:false,
  })
}