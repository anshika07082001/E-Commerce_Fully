import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { productData } from "../Features/commerceSlice";
import { state } from "../Type/Type";
import AdminPanel from "./adminFolder/AdminPanel";
import Cart from "./UserFolder/Cart";
import Login from "./Login";
import ManagerPage from "./managerFolder/ManagerPage";
import SignUp from "./SignUp";
import UserPage from "./UserFolder/UserPage";

const Main = () => {
  let useAppSelector: TypedUseSelectorHook<state> = useSelector;
  let state = useAppSelector((state) => state.commerceSlice);
  let dispatch = useDispatch();
  // function gets the products data from api
  useEffect(() => {
    if (state.products.length <= 0) {
      dispatch<any>(productData());
    }
  }, [state.products.length]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin_panel" element={<AdminPanel />} />
        <Route path="/user_page" element={<UserPage />} />
        <Route path="/manager_page" element={<ManagerPage />} />
        <Route path="/cart_page" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Main;
