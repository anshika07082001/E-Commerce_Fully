import { Route, Routes } from "react-router-dom";
import AdminPanel from "./adminFolder/AdminPanel";
import Cart from "./Cart";
import Login from "./Login";
import ManagerPage from "./managerFolder/ManagerPage";
import SignUp from "./SignUp";
import UserPage from "./UserFolder/UserPage";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/manager-page" element={<ManagerPage />} />
        <Route path="/cart-page" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Main;
