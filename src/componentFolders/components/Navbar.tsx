import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getLogin,
  getProductsData,
  getSignData,
  getUsersData,
  logOut,
} from "../Features/commerceSlice";
import { state } from "../Type/Type";

const Navbar = () => {
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  var navigate = useNavigate();
  var dispatch = useDispatch();

  // function gets the data from localStorage and dispatches to reducer
  useEffect(() => {
    let products = localStorage.getItem("productsData");
    let users = localStorage.getItem("usersData");
    let signData = localStorage.getItem("signData");
    var login = localStorage.getItem("loginData");
    if (
      products !== null &&
      users !== null &&
      signData !== null &&
      login !== null
    ) {
      dispatch(getProductsData(JSON.parse(products)));
      dispatch(getUsersData(JSON.parse(users)));
      dispatch(getSignData(JSON.parse(signData)));
      dispatch(getLogin(JSON.parse(login)));
    }
  }, []);
  // function logouts the user and dispatches the logout function
  const logOutHandler = () => {
    dispatch(logOut("logout"));
    navigate("/login");
  };
  // function navigates to login page if someone clicks the login button
  const loginHandler = () => {
    if (state.loginObj.email == "") {
      navigate("/login");
    }
  };
  // function navigates to cartpage if someone clicks on cart icon
  const cartHandler = () => {
    if (state.loginObj.email !== "") {
      navigate("/cart-page");
    } else {
      alert("You must login First!!");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow bg-body-tertiary col-12 position-fixed">
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
        <div>
          {/* rendering of Users name */}
          {state.loginObj.name !== "" ? (
            <label>
              Hello,{" "}
              {state.loginObj.name.substring(
                0,
                state.loginObj.name.indexOf(" ")
              )}
            </label>
          ) : (
            <label>Hello, User</label>
          )}
          {/* rendering of logout button */}
          {state.loginObj.email !== "" ? (
            <button className="btn text-danger" onClick={logOutHandler}>
              LogOut
            </button>
          ) : (
            <></>
          )}
          {/* rendering of login button */}
          {state.loginObj.email == "" ? (
            <button className="btn text-success" onClick={loginHandler}>
              LogIn
            </button>
          ) : (
            <></>
          )}
          {/* rendering of cart icon */}
          {state.loginObj.role == "User" ? (
            <i className="bi bi-cart fs-2" onClick={cartHandler}></i>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
