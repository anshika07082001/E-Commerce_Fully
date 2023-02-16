import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getLogin, logOut } from "../Features/commerceSlice";
import { state } from "../Type/Type";

const Navbar = () => {
  var useAppSelector:TypedUseSelectorHook<state>=useSelector
  var state=useAppSelector(state=>state.commerceSlice)
  var navigate = useNavigate();
  var dispatch=useDispatch()

  useEffect(()=>{
    var login = localStorage.getItem('loginData')||''
    dispatch(getLogin(JSON.parse(login)))
  },[])

  const logOutHandler=()=>{
    dispatch(logOut('logout'))
  }

  return (
    <nav className="navbar navbar-expand-lg shadow bg-body-tertiary col-12">
      <div className="container-fluid">
        <Link
          to="/user-page"
          className="text-decoration-none text-dark fw-bolder"
        >
          <img
            src="logo.png"
            style={{ height: "60px", width: "70px" }}
            alt=""
          />
        </Link>
        <i
          className="bi bi-cart fs-2"
          onClick={() => navigate("/cart-page")}
        ></i>
        {state.loginObj.name !== "" ? (
          <label>Hello, {state.loginObj.name.substring(0, state.loginObj.name.indexOf(" "))}</label>
        ) : (
          <label>Hello, User</label>
        )}
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
    </div> */}
    <button className="btn text-danger" onClick={logOutHandler}>LogOut</button>
    <button className="btn text-success" onClick={()=>navigate('/login')}>LogIn</button>
      </div>
    </nav>
  );
};

export default Navbar;
