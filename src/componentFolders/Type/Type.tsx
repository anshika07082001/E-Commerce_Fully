export type signObj = {
    name:string,email:string,pwd:string,role:string
}
export type signData={
    signData:signObj[]
    loginObj:signObj
    users:signObj[]
}

export type state={
    commerceSlice:signData
}

export type msgArr ={
    nameMsg:string,emailMsg:string,pwdMsg:string,errormsg:string
}