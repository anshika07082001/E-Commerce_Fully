import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signData } from "../Type/Type";

var initialState: signData = {
  signData: [],
  loginObj: { name: "", email: "", pwd: "", role: "", cart: [] },
  users: [],
  loading: false,
  error: {},
  products: [],
  searchArr: [],
};

// function fetches the data from dummy json

export const productData = createAsyncThunk(
  "commerce/productData",
  async () => {
    let res;
    try {
      res = await axios.get("https://dummyjson.com/products");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const commerceSlice = createSlice({
  name: "commerce",
  initialState,
  reducers: {
    // function sets the data to signData state
    getSignData(state, action) {
      state.signData = action.payload;
    },
    // function sets the new signUp entry to state and save to local storage
    signUp(state, action) {
      var sign = localStorage.getItem("signData");
      if (sign !== null) {
        state.signData = JSON.parse(sign);
        localStorage.setItem("signData", JSON.stringify(state.signData));
      }
      state.signData.push(action.payload);
      localStorage.setItem("signData", JSON.stringify(state.signData));
    },
    // function sets the data to loginObj state
    getLogin(state, action) {
      state.loginObj = action.payload;
    },
    // function sets the new login entry to state and save to local Storage
    login(state, action) {
      state.loginObj = action.payload;
      localStorage.setItem("loginData", JSON.stringify(state.loginObj));
    },
    // function logouts the login entry and sets the local storage
    logOut(state, action) {
      state.loginObj = { name: "", email: "", pwd: "", role: "", cart: [] };
      localStorage.setItem("loginData", JSON.stringify(state.loginObj));
    },
    // function sets the usersData to state and save to local storage
    UsersData(state, action) {
      state.users = action.payload;
      localStorage.setItem("usersData", JSON.stringify(state.users));
    },
    // function sets the users to state
    getUsersData(state, action) {
      state.users = action.payload;
    },
    // function deletes and sets the users state
    deleteUsersData(state, action) {
      state.signData.splice(action.payload.ind, 1);
      state.users.splice(action.payload.index, 1);
      localStorage.setItem("usersData", JSON.stringify(state.users));
      localStorage.setItem("signData", JSON.stringify(state.signData));
    },
    // function sets the products data to state and local storage
    getProductsData(state, action) {
      state.products = action.payload;
      state.searchArr = action.payload;
      localStorage.setItem("productsData", JSON.stringify(state.products));
    },
    // function updates the products data to local storage and state
    updateProductsData(state, action) {
      state.products[action.payload.index].stock = action.payload.val;
      localStorage.setItem("productsData", JSON.stringify(state.products));
    },
    // function searches the products
    searchProducts(state, action) {
      state.searchArr = [];
      state.products.map((item: any) => {
        if (
          item.title.toLowerCase().substring(0, action.payload.length) ==
          action.payload.toLowerCase()
        ) {
          state.searchArr.push(item);
        }
      });
    },
    // function adds the data and set the localstorage
    addCart(state, action) {
      var val = state.searchArr[action.payload.i].title;
      if (state.searchArr[action.payload.i].stock > 0) {
        if (state.signData[action.payload.index].cart.length > 0) {
          for (
            var i = 0;
            i < state.signData[action.payload.index].cart.length;
            i++
          ) {
            if (state.signData[action.payload.index].cart[i].title === val) {
              state.signData[action.payload.index].cart[i].quantity++;
              break;
            } else if (
              i ===
              state.signData[action.payload.index].cart.length - 1
            ) {
              state.signData[action.payload.index].cart.push({
                title: state.searchArr[action.payload.i].title,
                brand: state.searchArr[action.payload.i].brand,
                id: state.searchArr[action.payload.i].id,
                quantity: 1,
                price: state.searchArr[action.payload.i].price,
              });
              break;
            }
          }
        } else {
          state.signData[action.payload.index].cart.push({
            title: state.searchArr[action.payload.i].title,
            brand: state.searchArr[action.payload.i].brand,
            id: state.searchArr[action.payload.i].id,
            quantity: 1,
            price: state.searchArr[action.payload.i].price,
          });
        }
        state.products[action.payload.i].stock--;
        state.searchArr[action.payload.i].stock--;
      }
      localStorage.setItem("productsData", JSON.stringify(state.products));
      localStorage.setItem("signData", JSON.stringify(state.signData));
    },
    // function deletes the products and set the local storage
    deleteproduct(state, action) {
      state.products[action.payload.prodInd].stock =
        state.products[action.payload.prodInd].stock +
        state.signData[action.payload.signInd].cart[action.payload.cartInd]
          .quantity;
      state.signData[action.payload.signInd].cart.splice(
        action.payload.cartInd,
        1
      );
      localStorage.setItem("signData", JSON.stringify(state.signData));
      localStorage.setItem("productsData", JSON.stringify(state.products));
    },
    // function sorts the products data
    sortProducts(state, action) {
      state.searchArr = action.payload;
    },
    // function filters the products data
    filterProducts(state, action) {
      state.searchArr = action.payload;
    },
    // function increments the products quantity
    plusProducts(state, action) {
      state.signData.map((item: any) => {
        if (item.email == state.loginObj.email) {
          item.cart.map((ele: any) => {
            if (ele.id == action.payload.id) {
              ele.quantity++;
            }
          });
        }
      });
      state.searchArr.map((item: any) => {
        if (item.id == action.payload.id) {
          item.stock--;
        }
      });
      state.products = state.searchArr;
      localStorage.setItem("signData", JSON.stringify(state.signData));
      localStorage.setItem("productsData", JSON.stringify(state.products));
    },
    // function decrements the products quantity
    minusProducts(state, action) {
      if (action.payload.quantity > 0) {
        state.signData.map((item: any) => {
          if (item.email == state.loginObj.email) {
            item.cart.map((ele: any) => {
              if (ele.id == action.payload.id) {
                ele.quantity--;
              }
            });
          }
        });
        state.searchArr.map((item: any) => {
          if (item.id == action.payload.id) {
            item.stock++;
          }
        });
      }
      state.products = state.searchArr;
      localStorage.setItem("signData", JSON.stringify(state.signData));
      localStorage.setItem("productsData", JSON.stringify(state.products));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productData.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(productData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.searchArr = action.payload.products;
        localStorage.setItem("productsData", JSON.stringify(state.products));
      })
      .addCase(productData.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const {
  getSignData,
  addCart,
  signUp,
  getUsersData,
  getLogin,
  login,
  logOut,
  UsersData,
  deleteUsersData,
  updateProductsData,
  getProductsData,
  searchProducts,
  deleteproduct,
  sortProducts,
  filterProducts,
  plusProducts,
  minusProducts,
} = commerceSlice.actions;
export default commerceSlice.reducer;
