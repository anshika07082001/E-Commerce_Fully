import { SerializedError } from "@reduxjs/toolkit";

export type signObj = {
  name: string;
  email: string;
  pwd: string;
  role: string;
  cart: cartProps[];
};

export type state = {
  commerceSlice: signData;
};

export type msgArr = {
  nameMsg: string;
  emailMsg: string;
  pwdMsg: string;
  errorMsg: string;
};

export type signData = {
  signData: signObj[];
  loginObj: signObj;
  users: signObj[];
  loading: boolean;
  error: SerializedError;
  products: any;
  searchArr: any;
};

export type cartProps = {
  title: string;
  quantity: number;
  id: number;
  brand: string;
  price: number;
};
