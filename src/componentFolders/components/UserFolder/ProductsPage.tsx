import React, { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCart, getProductsData, getUsersData, productData } from '../../Features/commerceSlice'
import { state } from '../../Type/Type'

const ProductsPage = () => {
    var useAppSelector:TypedUseSelectorHook<state>=useSelector
  var state=useAppSelector(state=>state.commerceSlice)
  var dispatch=useDispatch()
  var navigate=useNavigate()

  useEffect(()=>{
    let products = localStorage.getItem('productsData')||''
    dispatch(getProductsData(JSON.parse(products)))
    let users=localStorage.getItem('usersData')
    dispatch(getUsersData(JSON.parse(users||'')))
  },[])
  

  const addProdHandler=(i:number)=>{
    // console.log(state.users)
    let login = localStorage.getItem('loginData')||''
    var obj = JSON.parse(login)
    if(obj.name!==''){
      if(obj.role=='User'){
        state.users.map((item,index)=>{
          if(item.email==obj.email){
            dispatch(addCart({i:i,index:index}))
          }
        })
      }
      else{
        alert('Only Users are allowed to add Products to their cart!!')
      }
    }
    else{
      navigate('/login')
    }
    // if(state.cartArr.length>0){
    //   state.cartArr.map((item,i)=>{
    //     if(item.id==obj.id){
    //       dispatch(addCart(i))
    //     }
    //   })
    // }
    // if(state.cartArr.length==0){
    //   dispatch(addCart(obj))
    // }
  }

  console.log(state.users)


  return (
    <div className='col-10 p-3 grid m-auto'>
      {state.products.length>0?
      state.products.map((item,i)=>{
        return(
          <div key={i} id='grid__products' className='col-12 m-auto shadow rounded p-4 rounded shadow d-flex flex-column align-items-center justify-content-center'>
            <img src={item.thumbnail} className='col-2 grid__img' alt=''/>
            <p className='fs-5 text-secondary'>{item.title}</p>
            <span className='fw-light msgFont'>{item.description.substring(0,40)}</span>
            <span className='msgFont fw-bold text-success'>Offer price ₹{item.price}</span>
            <span className='text-warning msgFont'>Rating: {item.rating}</span>
            <div className='d-flex flex-row align-items-center justify-content-between p-1 col-12'>
                <label className='fw-bold text-danger'>Quantity: {item.stock}</label>
                <button className='btn btn-warning' onClick={()=>addProdHandler(i)}>Add to Cart</button>
            </div>
          </div>
        )
      })
      :<></>}
    </div>
  )
}

export default ProductsPage