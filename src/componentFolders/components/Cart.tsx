import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  deleteproduct,
  getProductsData,
  getSignData,
} from "../Features/commerceSlice";
import { state } from "../Type/Type";
import Navbar from "./Navbar";
var obj: any,
  flag = false;
var total: number = 0;

const Cart = () => {
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  var dispatch = useDispatch();
  // var [total,setTotal]=useState(0)

  useEffect(() => {
    var login = localStorage.getItem("loginData") || "";
    obj = JSON.parse(login);
    let signData = localStorage.getItem("signData");
    dispatch(getSignData(JSON.parse(signData || "")));
    let products = localStorage.getItem("productsData") || "";
    dispatch(getProductsData(JSON.parse(products)));
  }, []);

  const deleteprod = (i: number, objItem: any) => {
    var prodInd, cartInd, signInd;
    state.products.map((item: any, prodIndex: number) => {
      if (item.id == objItem.id) {
        prodInd = prodIndex;
      }
    });
    state.signData.map((item, signIndex) => {
      if (item.name == obj.name) {
        signInd = signIndex;
        item.cart.map((ele, eleIndex) => {
          if (ele.id == objItem.id) {
            cartInd = eleIndex;
          }
        });
      }
    });
    dispatch(
      deleteproduct({ prodInd: prodInd, cartInd: cartInd, signInd: signInd })
    );
  };
  const minusHandler=()=>{

  }

  const plusHandler=()=>{

  }

  return (
    <>
      <Navbar />
      <table className="m-auto col-10 text-center">
        <tbody>
          {state.signData.length > 0 && obj !== undefined ? (
            state.signData.map((item) => {
              if (item.email == obj.email) {
                if (item.cart.length > 0) {
                  flag = false;
                  total = 0;
                  return item.cart.map((ele, i) => {
                    var sum = { ...ele };
                    total = total + sum.price;
                    return (
                      <>
                        {!i && (
                          <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th>Product Price</th>
                            <th>Product Quantity</th>
                            <th>Action</th>
                          </tr>
                        )}
                        <tr key={ele.id} className="">
                          <td>{ele.id}</td>
                          <td>{ele.title}</td>
                          <td>{ele.brand}</td>
                          <td>{ele.price}</td>
                          <td>
                            <button
                              className=" me-2 btn btn-warning rounded-circle fs-6 fw-bold"
                              onClick={() => minusHandler()}
                            >
                              -
                            </button>
                            <label>{ele.quantity}</label>
                            <button className="btn ms-2 btn-warning rounded-circle fs-6 fw-bold" onClick={()=>plusHandler()}>
                              +
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger rounded-circle"
                              onClick={() => deleteprod(i, ele)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  });
                } else {
                  flag = true;
                  total = 0;
                }
              }
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {total > 0 ? <h3 className="text-center mt-2">Grand total= {total}</h3> : <></>}
      {flag ? (
        <div className="col-12 text-center p-5">
          <img
            src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png"
            alt=""
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Cart;
