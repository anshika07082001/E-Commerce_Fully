import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signData } from "../Type/Type";

var initialState:signData={
    signData:[],
    loginObj:{name:'',email:'',pwd:'',role:''},
    users:[],
    loading:false,
    error:{},
    products:[]
}

export const productData = createAsyncThunk('commerce/productData',
async ()=>{
    let res;
    try{
        res= await axios.get('https://dummyjson.com/products')
        return res.data
    }
    catch(error){
        console.log(error)
    }
})


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
            localStorage.setItem('usersData',JSON.stringify(state.users))
        },
        deleteUsersData(state,action){
            state.signData.splice(action.payload.ind,1)
            state.users.splice(action.payload.index,1)
            localStorage.setItem('signData',JSON.stringify(state.signData))
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(productData.pending,(state,action)=>{
            state.loading=false
        })
        .addCase(productData.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload.products
            // console.log(action.payload.products)
        })
        .addCase(productData.rejected,(state,action)=>{
            state.error=action.error
        })

    }
})

export const {signUp,getUsersData,login,UsersData,deleteUsersData}=commerceSlice.actions
export default commerceSlice.reducer