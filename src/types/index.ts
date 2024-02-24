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