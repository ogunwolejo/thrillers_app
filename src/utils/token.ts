import {sign} from 'jsonwebtoken';

export const generateToken = (payload:string) => {
  console.log("payload", payload);
  const secret:string = process.env.SECRET ?? 'Mm12345';
  const token:string = sign(payload.toString(), secret, {
    expiresIn:'2 days'
  })
  console.log('@@', token);
  return token;
}