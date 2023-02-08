import React from "react";

const Login = () => {
  return (
    <div className="col-12 d-flex flex-column align-items-center window__Size">
      <img src="logo.png" className="col-3 col-sm-2 col-md-1" alt="" />
      <div className="col-10 col-lg-5 col-md-6 col-sm-7 p-3 mb-4 rounded shadow d-flex align-items-center flex-column">
        <h2>Log In</h2>
        <form className="d-flex flex-column col-10 p-2">
          <label className="mt-1">Enter Email</label>
          <input className="mt-1 p-1" type='email'/>
          <label className="mt-1">Enter Password</label>
          <input className="mt-1 p-1" type='password'/>
          <button className="col-5 m-auto mt-3 p-2 rounded border-0 bg-warning">
            Log In
          </button>
        </form>
        <label className="mt-2">
          By Continuing You will continue to{" "}
          <span className="text-primary">E-commerce Conditions</span>
        </label>
      </div>
    </div>
  );
};

export default Login;
