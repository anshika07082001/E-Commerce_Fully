import { createSlice } from "@reduxjs/toolkit";
import { signData } from "../Type/Type";

var initialState:signData={
    signData:[],
    loginObj:{name:'',email:'',pwd:'',role:''},
    users:[]
}

const commerceSlice = createSlice({
    name:'commerce',
    initialState,
    reducers:{
        getUsersData(state,action){
            state.signData=action.payload
        },
        signUp(state,action){
            state.signData.push(action.payload)
            localStorage.setItem('signData',JSON.stringify(state.signData))
        },
        login(state,action){
            state.loginObj=action.payload
            localStorage.setItem('loginData',JSON.stringify(state.loginObj))
        },
        UsersData(state,action){
            state.users=action.payload
        }
    },
    extraReducers:{

    }
})

export const {signUp,getUsersData,login,UsersData}=commerceSlice.actions
export default commerceSlice.reducer