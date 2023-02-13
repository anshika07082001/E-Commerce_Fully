import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getProductsData, updateProductsData } from "../../Features/commerceSlice";
import { state } from "../../Type/Type";
import Navbar from "../Navbar";

const ManagerPage = () => {
    var [msg,setMsg]=useState('')
  var dispatch = useDispatch();
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);

  useEffect(()=>{
    let products = localStorage.getItem('productsData')||''
    dispatch(getProductsData(JSON.parse(products)))
  },[])

  const stockHandler = (e:React.ChangeEvent<HTMLInputElement>,i:number) => {
    dispatch(updateProductsData({index:i,val:e.target.value}))
    setMsg('Updated Successfully!!')
    setTimeout(()=>setMsg(''),2000)
  };

  return (
    <>
      <Navbar />
      <section className=" p-2">
      <h6 className=" text-center text-success">{msg}</h6>
      {state.products.length > 0 ? (
        <table
          className="col-10 m-auto shadow bg-light text-center"
          id="users__table"
        >
          <tbody>
            <tr>
              <th className="p-2 bg-dark text-white border-bottom border-dark">
                S.NO.
              </th>
              <th className="p-2 bg-dark text-white border-bottom border-dark">
                Product Name
              </th>
              <th className="p-2 bg-dark text-white border-bottom border-dark">
                Product Price & Rating
              </th>
              <th className="p-2 bg-dark text-white border-bottom border-dark">
                Product Stock
              </th>
            </tr>
            {state.products.map((item, i) => {
              return (
                <tr key={i}>
                  <td
                    className="p-2 border-bottom border-dark"
                  >
                    {item.id}
                  </td>
                  <td
                    className="p-2 border-bottom border-dark"
                  >
                    {item.title}
                  </td>
                  <td
                    className="p-2 border-bottom border-dark"
                  >
                    ₹{item.price}/{item.rating}
                  </td>
                  <td
                    className="p-2 border-bottom border-dark"
                  >
                    <input key={item.id}
                      onChange={(e)=>stockHandler(e,i)}
                      className="col-2 text-center"
                      value={item.stock}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>
          <h2 className="m-auto text-center text-danger">
            No Products Found!!
          </h2>
        </>
      )}
      </section>
    </>
  );
};

export default ManagerPage;