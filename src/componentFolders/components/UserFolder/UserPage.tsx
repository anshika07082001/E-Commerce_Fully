import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  searchProducts,
  sortProducts,
} from "../../Features/commerceSlice";
import { state } from "../../Type/Type";
import Navbar from "../Navbar";
import ProductsPage from "./ProductsPage";

const UserPage = () => {
  let useAppSelector: TypedUseSelectorHook<state> = useSelector;
  let state = useAppSelector((state) => state.commerceSlice);
  let dispatch = useDispatch();
  let sort = ["price", "rating", "stock"];
  let filter = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];
  let filterArr: any = [];

  // function searches the products and dispatches the searchproduct function

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(searchProducts(e.target.value));
  };
  // function sorts the data and dispatches the sortproducts function
  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let val = e.currentTarget.value;
    let newArr = [...state.products];
    newArr.sort((p1: any, p2: any) => p1[val] - p2[val]);
    dispatch(sortProducts(newArr));
  };
  // function filters the data and dispatches the filterproducts function
  const filterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    state.products.forEach((item: any) => {
      if (item.category === e.currentTarget.value) {
        filterArr.push(item);
      }
    });
    dispatch(filterProducts(filterArr));
  };

  return (
    <>
      <Navbar />
      <div className="col-12 pt-5">
        <img
          src="https://assets.ajio.com/cms/AJIO/WEB/D-UHP-Trendswithbenefits-Sectionheader.jpg"
          className="col-12 pt-5"
          alt=""
        />
      </div>
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
          {/* rendering of select box for sorting data */}
          <select
            onChange={(e) => sortHandler(e)}
            className="text-secondary text-center p-2 rounded m-1 border"
          >
            <option hidden>Sort ⇅</option>
            {sort.map((item, i) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          {/* rendering the select box for filtering data */}
          <select
            className="text-secondary text-center p-2 rounded m-1 border"
            onChange={(e) => filterHandler(e)}
          >
            <option hidden>Filter By Category</option>
            {filter.map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
        </div>
      </div>
      {/* component renders the products */}
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
    </>
  );
};

export default UserPage;
