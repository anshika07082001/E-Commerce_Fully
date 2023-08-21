import React, { useEffect, useRef, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSignData, login } from "../Features/commerceSlice";
import { state } from "../Type/Type";

const Login = () => {
  let useAppSelector: TypedUseSelectorHook<state> = useSelector;
  let state = useAppSelector((state) => state.commerceSlice);
  let inpRefs = useRef<any>([]);
  let dispatch = useDispatch();
  let [msgFlg, setMsgFlg] = useState({ flg: false, errMsg: "" });
  let navigate = useNavigate();
  useEffect(() => {
    let signData = localStorage.getItem("signData");
    if (signData !== null) {
      dispatch(getSignData(JSON.parse(signData)));
    }
  }, []);

  // function runs on click of login button and dispatches the login function
  const logHandler = () => {
    let temp = false;
    if (
      inpRefs.current.email.value !== "" &&
      inpRefs.current.pwd.value !== ""
    ) {
      state.signData.forEach((item: any) => {
        if (
          item.email === inpRefs.current.email.value &&
          item.pwd === inpRefs.current.pwd.value
        ) {
          temp = true;
          dispatch(login(item));
          setMsgFlg({ flg: true, errMsg: "Login Successfully!!" });
          setTimeout(() => checkRole(item), 1000);
          inpRefs.current.email.value = "";
          inpRefs.current.pwd.value = "";
        }
      });
      if (temp === false) {
        setMsgFlg({
          flg: msgFlg.flg,
          errMsg: "details not matched please check your password or email!!",
        });
        setTimeout(() => setMsgFlg({ flg: msgFlg.flg, errMsg: "" }), 2000);
      }
    } else {
      setMsgFlg({ flg: msgFlg.flg, errMsg: "Fill all fields" });
      setTimeout(() => setMsgFlg({ flg: msgFlg.flg, errMsg: "" }), 2000);
    }
  };
  // function checks the role of users and navigates to another component
  const checkRole = (item: any) => {
    if (item.role === "Admin") {
      navigate("/admin_panel");
    }
    if (item.role === "Manager") {
      navigate("/manager_page");
    }
    if (item.role === "User") {
      navigate("/user_page");
    }
  };

  return (
    <div className="col-12 d-flex flex-column align-items-center window__Size">
      <img src="logo.png" className="col-3 col-sm-2 col-md-1" alt="" />
      <div className="col-10 col-lg-5 col-md-6 col-sm-7 p-3 mb-4 rounded shadow d-flex align-items-center flex-column">
        <h2>Log In</h2>
        <span
          className={
            msgFlg.errMsg === "Login Successfully!!"
              ? "text-success"
              : "text-danger"
          }
        >
          {msgFlg.errMsg}
        </span>
        <div className="d-flex flex-column col-10 p-2">
          <label className="mt-1">Enter Email</label>
          <input
            className="mt-1 p-1"
            type="email"
            ref={(ref) => (inpRefs.current.email = ref)}
          />
          <label className="mt-1">Enter Password</label>
          <input
            className="mt-1 p-1"
            type="password"
            ref={(ref) => (inpRefs.current.pwd = ref)}
          />
          {/* rendering of loader */}
          {msgFlg.flg ? (
            <img
              className="col-3 m-auto"
              src="https://i.gifer.com/origin/ec/ecf46fc2a40f43ad0ef438b04b0d2e8e_w200.gif"
              alt=""
            />
          ) : (
            <></>
          )}
          <button
            onClick={logHandler}
            className="col-5 m-auto mt-3 p-2 rounded border-0 bg-warning"
          >
            Log In
          </button>
        </div>
        <Link to="/">Sign Up</Link>
        <label className="mt-2">
          By Continuing You will continue to{" "}
          <span className="text-primary">E-commerce Conditions</span>
        </label>
      </div>
    </div>
  );
};

export default Login;
