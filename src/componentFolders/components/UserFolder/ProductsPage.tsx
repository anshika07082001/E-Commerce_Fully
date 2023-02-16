import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCart,
  getProductsData,
  getSignData,
  getUsersData,
} from "../../Features/commerceSlice";
import { state } from "../../Type/Type";

const ProductsPage = () => {
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  var dispatch = useDispatch();
  var navigate = useNavigate();

  const addProdHandler = (i: number) => {
    // console.log(state.searchArr[i])
    let login = localStorage.getItem("loginData") || "";
    var obj = JSON.parse(login);
    if (obj.name !== "") {
      if (obj.role == "User") {
        state.signData.map((item, index) => {
          if (item.email == obj.email) {
            dispatch(addCart({ i: i, index: index }));
          }
        });
      } else {
        alert("Only Users are allowed to add Products to their cart!!");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {state.searchArr.length > 0 ? (
        <div className="col-10 p-3 grid m-auto">
          {state.searchArr.map((item:any, i:number) => {
            return (
              <div
                key={i}
                id="grid__products"
                className="col-12 m-auto shadow rounded p-4 rounded shadow d-flex flex-column align-items-center justify-content-center"
              >
                <img src={item.thumbnail} className="col-2 grid__img" alt="" />
                <p className="fs-5 text-secondary">{item.title}</p>
                <span className="fw-light msgFont">
                  {item.description.substring(0, 40)}
                </span>
                <span className="msgFont fw-bold text-success">
                  Offer price ₹{item.price}
                </span>
                <span className="text-warning msgFont">
                  Rating: {item.rating}
                </span>
                <div className="d-flex flex-row align-items-center justify-content-between p-1 col-12">
                  <label
                    className={
                      item.stock > 0
                        ? "fw-bold text-success"
                        : "fw-bold text-danger"
                    }
                  >
                    Quantity: {item.stock}
                  </label>
                  <button
                    className="btn btn-warning"
                    onClick={() => addProdHandler(i)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="col-12 text-center m-auto">
          <img
            className="col-6 m-auto"
            src="https://cdn.dribbble.com/users/1242216/screenshots/9326781/dribbble_shot_hd_-_3_4x.png"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
