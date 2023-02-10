import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./adminFolder/AdminPanel";
import Login from "./Login";
import SignUp from "./SignUp";
import UserPage from "./UserFolder/UserPage";

var adminArr = [{name:'Anshika Chaurasiya',email:'ashu782001@gmail.com',pwd:'Anshika@123',role:'Admin'}]
var managerArr = [{name:'Khushi Srivastava',email:'khushi1007@gmail.com',pwd:'Khushi@123',role:'Manager'}]


const Main = () => { 

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/admin-panel" element={<AdminPanel/>}/>
        <Route path="/user-page" element={<UserPage/>}/>
      </Routes>
    </>
  );
};

export default Main;
