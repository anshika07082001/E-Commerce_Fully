import React, { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { productData } from '../../Features/commerceSlice'
import { state } from '../../Type/Type'
import Navbar from '../Navbar'
import Banner from './Banner'
import ProductsPage from './ProductsPage'

const UserPage = () => {
  var useAppSelector:TypedUseSelectorHook<state>=useSelector
  var state=useAppSelector(state=>state.commerceSlice)
  var dispatch=useDispatch()
  useEffect(()=>{
    dispatch<any>(productData())
  },[])

  console.log(state.products)
  return (
    <div className='col-12'>
    <Navbar/>
    <Banner/>  
    <ProductsPage/>
    <img src='https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Gamezone-Tile.gif' className='col-12' alt=''/>  
    <img src='https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Accessories-SectionHeader.jpg' className='col-12' alt=''/>
    </div>
  )
}

export default UserPage