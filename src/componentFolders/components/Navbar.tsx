import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow bg-body-tertiary col-12">
  <div className="container-fluid">
    <Link to='/user-page' className='text-decoration-none text-dark fw-bolder'>
      <img src='logo.png' style={{height:'60px',width:'70px'}} alt=''/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href=" ">Home</a>
        </li>
      </ul> */}
      <form className="d-flex ms-auto" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-success" type="submit"><i className="bi bi-search"></i></button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar