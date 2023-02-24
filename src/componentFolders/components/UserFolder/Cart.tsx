import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  deleteproduct,
  minusProducts,
  plusProducts,
} from "../../Features/commerceSlice";
import { state } from "../../Type/Type";
import Navbar from "../Navbar";
var flag = false;
var total: number = 0;

const Cart = () => {
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  var dispatch = useDispatch();
  // function deletes the product from stock
  const deleteprod = (i: number, objItem: any) => {
    var prodInd, cartInd, signInd;
    state.products.map((item: any, prodIndex: number) => {
      if (item.id == objItem.id) {
        prodInd = prodIndex;
      }
    });
    state.signData.map((item, signIndex) => {
      if (item.name == state.loginObj.name) {
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
  // function decrements the quantity of product added to cart
  const minusHandler = (obj: any) => {
    dispatch(minusProducts(obj));
  };
  // function increments the quantity of product added to cart
  const plusHandler = (obj: any) => {
    dispatch(plusProducts(obj));
  };
  // function generates the bill
  const order = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      {/* Rendering of cart table */}
      <div className="col-12 pt-5 padTop table-responsive">
        <table
          className="col-10 mt-3 pt-5 m-auto text-center shadow"
          id="users__table"
        >
          <tbody>
            {state.signData.length > 0 ? (
              state.signData.map((item) => {
                if (item.email == state.loginObj.email) {
                  if (item.cart.length > 0) {
                    flag = false;
                    total = 0;
                    return item.cart.map((ele, i) => {
                      var sum = { ...ele };
                      total = total + sum.price * sum.quantity;
                      return (
                        <>
                          {!i && (
                            <tr className="border-bottom border-dark pt-5">
                              <th className="p-2 bg-secondary text-light">
                                Product Id
                              </th>
                              <th className="p-2 bg-secondary text-light">
                                Product Name
                              </th>
                              <th className="p-2 bg-secondary text-light">
                                Product Brand
                              </th>
                              <th className="p-2 bg-secondary text-light">
                                Product Price
                              </th>
                              <th className="p-2 bg-secondary text-light">
                                Product Quantity
                              </th>
                              <th className="p-2 bg-secondary text-light">
                                Action
                              </th>
                            </tr>
                          )}
                          <tr
                            key={ele.id}
                            className=" border-bottom border-dark"
                          >
                            <td className="p-3">{ele.id}</td>
                            <td className="p-3">{ele.title}</td>
                            <td className="p-3">{ele.brand}</td>
                            <td className="p-3">₹{ele.price}</td>
                            <td className="d-flex flex-row align-items-center justify-content-center">
                              <button
                                className=" me-2 btn btn-warning rounded-circle fs-6 fw-bold"
                                onClick={() => minusHandler(ele)}
                              >
                                -
                              </button>
                              <label>{ele.quantity}</label>
                              <button
                                className="btn ms-2 btn-warning rounded-circle fs-6 fw-bold"
                                onClick={() => plusHandler(ele)}
                              >
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
      </div>
      {/* Rendering of Grand Total Amount and placeOrder button*/}
      {total > 0 ? (
        <div className="col-12 text-center">
          <h3 className="text-center mt-2">Grand total= ₹{total}</h3>
          <button
            className="btn btn-warning p-2 text-white shadow ps-4 pe-4 mb-3"
            onClick={order}
          >
            Place Order
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* renders the image if cart is empty */}
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
      {/* renders the image if user deletes the data from localstorage */}
      {state.loginObj.email == "" ? (
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
