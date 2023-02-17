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
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  var dispatch = useDispatch();
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
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/manager-page" element={<ManagerPage />} />
        <Route path="/cart-page" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Main;
