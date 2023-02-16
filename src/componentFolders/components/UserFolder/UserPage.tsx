import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  getProductsData,
  getSignData,
  getUsersData,
  searchProducts,
  sortProducts,
} from "../../Features/commerceSlice";
import { state } from "../../Type/Type";
import Navbar from "../Navbar";
import Banner from "./Banner";
import ProductsPage from "./ProductsPage";

const UserPage = () => {
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  var dispatch = useDispatch();
  var sort = ["price", "rating", "stock"];
  var filter = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];
  var filterArr: any = [];

  useEffect(() => {
    let products = localStorage.getItem("productsData") || "";
    dispatch(getProductsData(JSON.parse(products)));
    let users = localStorage.getItem("usersData");
    dispatch(getUsersData(JSON.parse(users || "")));
    let signData = localStorage.getItem("signData");
    dispatch(getSignData(JSON.parse(signData || "")));
  }, []);


  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(searchProducts(e.target.value));
  };

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    var val = e.currentTarget.value
    var newArr = [...state.products]
    newArr.sort((p1:any, p2:any) =>p1[val]-p2[val])
    // console.log(newArr)
    dispatch(sortProducts(newArr));
  };

  const filterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(state.products)
    state.products.map((item:any) => {
      if (item.category == e.currentTarget.value) {
        filterArr.push(item);
      }
    });
    dispatch(filterProducts(filterArr));
  };

  return (
    <div className="col-12">
      <Navbar />
      <Banner />
      <div className="col-12 p-3 d-flex flex-row justify-content-between align-items-center">
        <form className="d-flex col-4 mt-1" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Products..."
            onChange={searchHandler}
          />
          <button className="btn btn-success" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div>
          <select
            onChange={(e) => sortHandler(e)}
            className="text-secondary text-center p-2 rounded m-1 border"
          >
            <option hidden>Sort ⇅</option>
            {sort.map((item, i) => {
              return <option>{item}</option>;
            })}
          </select>
          <select
            className="text-secondary text-center p-2 rounded m-1 border"
            onChange={(e) => filterHandler(e)}
          >
            <option hidden>Filter By Category</option>
            {filter.map((item) => {
              return <option>{item}</option>;
            })}
          </select>
        </div>
      </div>
      <ProductsPage />
      <img
        src="https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Gamezone-Tile.gif"
        className="col-12"
        alt=""
      />
      <img
        src="https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Accessories-SectionHeader.jpg"
        className="col-12"
        alt=""
      />
    </div>
  );
};

export default UserPage;
