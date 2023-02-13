import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signData } from "../Type/Type";

var initialState:signData={
    signData:[],
    loginObj:{name:'',email:'',pwd:'',role:'',cart:[]},
    users:[],
    loading:false,
    error:{},
    products:[],
    searchArr:[],
    cartArr:[]
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
        },
        getProductsData(state,action){
            state.products=action.payload
            localStorage.setItem('productsData',JSON.stringify(state.products))
        },
        updateProductsData(state,action){
            state.products[action.payload.index].stock=action.payload.val
            localStorage.setItem('productsData',JSON.stringify(state.products))
        },
        searchProducts(state,action){
            // state.searchArr=[]
            // state.products.map((item)=>{
            //     if(item.title.toLowerCase().substring(0,action.payload.length)==action.payload.toLowerCase()){
            //         state.searchArr.push(item)
            //     }
            // })
        },
        addCart(state,action){
            var val = state.products[action.payload].title
            console.log(state.loginObj.cart.length)
            if(state.loginObj.cart.length>0){
                for(var i=0;i<state.loginObj.cart.length;i++){
                    if(state.loginObj.cart[i].title===val){
                        state.loginObj.cart[i].quantity++;
                        break;
                    }
                    else if(i===state.cartArr.length-1){
                        state.loginObj.cart.push({title:state.products[action.payload].title,brand:state.products[action.payload].brand,id:state.products[action.payload].id,quantity:1})
                        break
                    }
                }
            }
            else{
                state.loginObj.cart.push({title:state.products[action.payload].title,brand:state.products[action.payload].brand,id:state.products[action.payload].id,quantity:1})
            }
            state.products[action.payload].stock--
            localStorage.setItem('productsData',JSON.stringify(state.products))
            // localStorage.setItem('loginData',JSON.stringify(state.loginObj))
            // if(state.cartArr.length>0){
            //     for(var i=0;i<state.cartArr.length;i++){
            //         // if(state.cartArr[i].arr.title==val){
            //         //     state.cartArr.arr[i].stock++
            //         //     break
            //         // }
            //         // else if(i===state.cartArr.length-1){
            //         //     state.cartArr.push({arr:state.products[action.payload],login:state.loginObj})
            //         //     break
            //         // }
            //     }
            // }
            // else{
            //     alert()
            //     state.cartArr.map((item)=>{
            //         item.arr.push(state.products[action.payload])
            //     })
            //     // state.cartArr.push({arr:state.cartArr,login:state.loginObj})
            // }
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
            localStorage.setItem('productsData',JSON.stringify(state.products))
        })
        .addCase(productData.rejected,(state,action)=>{
            state.error=action.error
        })
    }
})

export const {addCart,signUp,getUsersData,login,UsersData,deleteUsersData,updateProductsData,getProductsData,searchProducts}=commerceSlice.actions
export default commerceSlice.reducer