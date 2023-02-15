import React, { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { getUsersData } from '../Features/commerceSlice'
import { state } from '../Type/Type'
import Navbar from './Navbar'
var obj:any

const Cart = () => {
    var useAppSelector:TypedUseSelectorHook<state>=useSelector
    var state=useAppSelector(state=>state.commerceSlice)
    var dispatch=useDispatch()
    var [cartArr,setCartArr]=useState<any>([])

    useEffect(()=>{
    var login = localStorage.getItem('loginData')||''
    obj = JSON.parse(login)
    let users=localStorage.getItem('usersData')
    dispatch(getUsersData(JSON.parse(users||'')))
    },[])

    useEffect(()=>{
        if(state.users.length>0){
            state.users.map((item)=>{
                if(item.email==obj.email){
                    cartArr=item.cart
                }
            })
            setCartArr(cartArr)
        }
        // console.log(arr)
    },[state.users.length])

    const minusQuantity=(i:number)=>{

    }

    const plusQuantity=(i:number)=>{

    }

  return (
    <>
    <Navbar/>
    <table className='m-auto col-10 text-center'>
        <tbody>
            <tr><th>Product Id</th><th>Product Name</th><th>Product Brand</th><th>Product Quantity</th><th>Action</th></tr>
            {cartArr.length>0?
            cartArr.map((item:any,i:number)=>{
                return (
                    <tr key={item.id}><td>{item.id}</td><td>{item.title}</td><td>{item.brand}</td><td><button onClick={()=>minusQuantity(i)}>-</button>{item.quantity}<button onClick={()=>plusQuantity(i)}>+</button></td><td><button>Delete</button></td></tr>
                )
            }):<></>}
        </tbody>
    </table>
    </>
  )
}

export default Cart