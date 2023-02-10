import React from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { state } from '../../Type/Type'

const ProductsPage = () => {
    var useAppSelector:TypedUseSelectorHook<state>=useSelector
  var state=useAppSelector(state=>state.commerceSlice)
  return (
    <div className='col-10 p-3 grid m-auto'>
      {state.products.length>0?
      state.products.map((item)=>{
        return(
          <div id='grid__products' className='col-12 m-auto shadow rounded p-4 rounded shadow d-flex flex-column align-items-center justify-content-center'>
            <img src={item.thumbnail} className='col-2 grid__img' alt=''/>
            <p className='fs-5 text-secondary'>{item.brand}</p>
            <span className='fw-light msgFont'>{item.description.substring(0,40)}</span>
            <span className='msgFont fw-bold text-success'>Offer price ₹{item.price}</span>
            <span className='text-warning msgFont'>Rating: {item.rating}</span>
            <div className='d-flex flex-row align-items-center justify-content-between p-1 col-12'>
                <label className='fw-bold text-danger'>Quantity: {item.stock}</label>
                <button className='btn btn-warning'>Add to Cart</button>
            </div>
          </div>
        )
      })
      :<></>}
    </div>
  )
}

export default ProductsPage