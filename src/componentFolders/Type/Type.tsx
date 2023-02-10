import { SerializedError } from "@reduxjs/toolkit";

export type signObj = {
  name: string;
  email: string;
  pwd: string;
  role: string;
};

export type productProps = {
  id: number;
  title: string;
  description:string;
  price:number;
  discountPercentage:number;
  rating:number;
  stock:number;
  brand:string;
  category:string;
  thumbnail:string;
  images:string[]
};

export type state = {
  commerceSlice: signData;
};

export type msgArr = {
  nameMsg: string;
  emailMsg: string;
  pwdMsg: string;
  errormsg: string;
};

export type signData = {
  signData: signObj[];
  loginObj: signObj;
  users: signObj[];
  loading: boolean;
  error: SerializedError;
  products: productProps[];
};
