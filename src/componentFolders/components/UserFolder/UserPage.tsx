import React from 'react'
import { useDispatch } from 'react-redux'
import { searchProducts } from '../../Features/commerceSlice'
import Navbar from '../Navbar'
import Banner from './Banner'
import ProductsPage from './ProductsPage'

const UserPage = () => {
  var dispatch=useDispatch()
  const searchHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.value)
    dispatch(searchProducts(e.target.value))
  }

  return (
    <div className='col-12'>
    <Navbar/>
    <Banner/>
    <form className="d-flex col-4 m-auto mt-1" role="search">
      <input className="form-control me-2" type="search" placeholder="Search Products..." onChange={searchHandler}/>
      <button className="btn btn-success" type="submit"><i className="bi bi-search"></i></button>
    </form>
    <ProductsPage/>
    <img src='https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Gamezone-Tile.gif' className='col-12' alt=''/>  
    <img src='https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Accessories-SectionHeader.jpg' className='col-12' alt=''/>
    </div>
  )
}

export default UserPage