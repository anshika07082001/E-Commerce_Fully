import React, { useState, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUp, UsersData } from "../Features/commerceSlice";
import { msgArr, state } from "../Type/Type";

const SignUp = () => {
  var role = ["Admin", "Manager", "User"];
  var [rol, setRol] = useState("");
  var inpRefs = useRef<any>({ name: null, email: null, role: null, pwd: null });
  var [msg, setMsg] = useState<msgArr>({
    nameMsg: "",
    emailMsg: "",
    pwdMsg: "",
    errormsg: "",
  });
  var dispatch = useDispatch();
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  // function checks validation
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var placeHolder = e.target.getAttribute("placeholder");
    msg.errormsg = "";
    if (placeHolder === "Enter Your Name") {
      if (e.target.value.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/)) {
        inpRefs.current.name.value = e.target.value;
        msg.nameMsg = "";
      } else {
        msg.nameMsg =
          "**name contains first letter of firstname & lastname capital";
      }
    }
    if (placeHolder === "Enter Your Email") {
      if (e.target.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        msg.emailMsg = "";
        inpRefs.current.email.value = e.target.value;
      } else {
        msg.emailMsg = "**email should follow this format: (abc123@gmail.com)";
      }
    }
    if (placeHolder === "Enter Your Password") {
      if (
        e.target.value.match(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
        )
      ) {
        msg.pwdMsg = "";
        inpRefs.current.pwd.value = e.target.value;
      } else {
        msg.pwdMsg =
          "**atleast 8 characters contains one special character, one capital letter one digit";
      }
    }
    setMsg({ ...msg });
  };
  // function runs on signup button click and dispatches the signdata reducer
  const signHandler = () => {
    let temp = false;
    if (
      inpRefs.current.name.value !== "" &&
      inpRefs.current.email.value !== "" &&
      inpRefs.current.pwd.value !== "" &&
      msg.emailMsg === "" &&
      msg.errormsg === "" &&
      msg.nameMsg === "" &&
      msg.pwdMsg === ""
    ) {
      if (rol !== "") {
        if (state.signData.length > 0) {
          var signData = localStorage.getItem("signData") || "";
          JSON.parse(signData).map((item: any) => {
            if (
              item.role == "User" &&
              item.email == inpRefs.current.email.value
            ) {
              temp = true;
            }
          });
        }
        if (temp) {
          msg.errormsg = "Email Already Exists!!";
        } else {
          var obj = {
            name: inpRefs.current.name.value,
            email: inpRefs.current.email.value,
            pwd: inpRefs.current.pwd.value,
            role: rol,
            cart: [],
          };
          dispatch(signUp(obj));
          inpRefs.current.name.value = "";
          inpRefs.current.email.value = "";
          inpRefs.current.pwd.value = "";
          msg.errormsg = "SignIn Successfully!!";
          userFunc();
        }
      } else {
        alert("please select the role!!");
      }
    } else {
      msg.errormsg = "All Fields Must be filled correctly";
    }
    setMsg({ ...msg });
  };

  // function checks the role of users and dispatches the usersData function
  const userFunc = () => {
    var arr: any = [];
    let User = localStorage.getItem("signData") || "";
    JSON.parse(User).map((item: any) => {
      if (item.role == "User") {
        arr.push(item);
      }
    });
    dispatch(UsersData(arr));
  };

  return (
    <div className="col-12 d-flex flex-column align-items-center window__Size">
      <img src="logo.png" className="col-3 col-sm-2 col-md-1" alt="" />
      <div className="col-10 col-lg-5 col-md-6 col-sm-7 p-3 mb-4 rounded shadow d-flex align-items-center flex-column">
        <h2>Sign Up</h2>
        <span
          className={
            msg.errormsg === "SignIn Successfully!!"
              ? "msgFont text-success fs-6"
              : "text-danger msgFont fs-6"
          }
        >
          {msg.errormsg}
        </span>
        <div className="d-flex flex-column col-10 p-2">
          <label className="mt-1">Enter Full Name</label>
          <input
            className="mt-1 p-1"
            ref={(ref) => (inpRefs.current.name = ref)}
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => changeHandler(e)}
          />
          <span className="text-danger msgFont">{msg.nameMsg}</span>
          <label className="mt-1">Enter Email</label>
          <input
            className="mt-1 p-1"
            ref={(ref) => (inpRefs.current.email = ref)}
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => changeHandler(e)}
          />
          <span className="text-danger msgFont">{msg.emailMsg}</span>
          <select
            className="mt-2 p-1"
            onChange={(e) => setRol(e.currentTarget.value)}
          >
            <option hidden>Select Role</option>
            {role.map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <label className="mt-1">Enter Password</label>
          <input
            className="mt-1 p-1"
            ref={(ref) => (inpRefs.current.pwd = ref)}
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => changeHandler(e)}
          />
          <span className="text-danger msgFont">{msg.pwdMsg}</span>
          <button
            onClick={signHandler}
            className="col-5 m-auto mt-3 p-2 rounded border-0 bg-warning shadow"
          >
            Sign Up
          </button>
        </div>
        <Link to="/login">Login</Link>
        <label className="mt-2">
          By Continuing You will continue to{" "}
          <span className="text-primary">E-commerce Conditions</span>
        </label>
      </div>
    </div>
  );
};

export default SignUp;
