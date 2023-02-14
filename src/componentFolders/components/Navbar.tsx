import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  var [loginName,setLoginName]=useState('')
  useEffect(()=>{
    var login = localStorage.getItem('loginData')||''
    var obj = JSON.parse(login)
    setLoginName(obj.name.substring(0,obj.name.indexOf(' ')))
  },[])

  return (
    <nav className="navbar navbar-expand-lg shadow bg-body-tertiary col-12">
  <div className="container-fluid">
    <Link to='/user-page' className='text-decoration-none text-dark fw-bolder'>
      <img src='logo.png' style={{height:'60px',width:'70px'}} alt=''/>
    </Link>
    <i className="bi bi-cart fs-2"></i>
    {loginName!==''?
    <label>Hello, {loginName}</label>:<label>Hello, User</label>}
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
    </div> */}
  </div>
</nav>
  )
}

export default Navbar