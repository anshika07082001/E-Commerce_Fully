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
    getSignData(state, action) {
      state.signData = action.payload;
    },
    signUp(state, action) {
      state.signData.push(action.payload);
      localStorage.setItem("signData", JSON.stringify(state.signData));
    },
    getLogin(state,action){
      state.loginObj=action.payload
    },
    login(state, action) {
      state.loginObj = action.payload;
      localStorage.setItem("loginData", JSON.stringify(state.loginObj));
    },
    logOut(state,action){
      state.loginObj={ name: "", email: "", pwd: "", role: "", cart: [] }
      localStorage.setItem('loginData',JSON.stringify(state.loginObj))
    },
    UsersData(state, action) {
      state.users = action.payload;
      localStorage.setItem("usersData", JSON.stringify(state.users));
    },
    getUsersData(state, action) {
      state.users = action.payload;
    },
    deleteUsersData(state, action) {
      state.signData.splice(action.payload.ind, 1);
      state.users.splice(action.payload.index, 1);
      localStorage.setItem("usersData", JSON.stringify(state.users));
      localStorage.setItem("signData", JSON.stringify(state.signData));
    },
    getProductsData(state, action) {
      state.products = action.payload;
      state.searchArr = action.payload;
      localStorage.setItem("productsData", JSON.stringify(state.products));
    },
    updateProductsData(state, action) {
      state.products[action.payload.index].stock = action.payload.val;
      localStorage.setItem("productsData", JSON.stringify(state.products));
    },
    searchProducts(state, action) {
      state.searchArr = [];
      state.products.map((item:any) => {
        if (
          item.title.toLowerCase().substring(0, action.payload.length) ==
          action.payload.toLowerCase()
        ) {
          state.searchArr.push(item);
        }
      });
    },
    addCart(state, action) {
      var val = state.products[action.payload.i].title;
      if (state.products[action.payload.i].stock > 0) {
        // state.searchArr = state.products;
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
                title: state.products[action.payload.i].title,
                brand: state.products[action.payload.i].brand,
                id: state.products[action.payload.i].id,
                quantity: 1,
                price: state.products[action.payload.i].price,
              });
              break;
            }
          }
        } else {
          state.signData[action.payload.index].cart.push({
            title: state.products[action.payload.i].title,
            brand: state.products[action.payload.i].brand,
            id: state.products[action.payload.i].id,
            quantity: 1,
            price: state.products[action.payload.i].price,
          });
        }
        state.products[action.payload.i].stock--;
        state.searchArr[action.payload.i].stock--
      }
      // state.searchArr = state.products;
      localStorage.setItem("productsData", JSON.stringify(state.products));
      localStorage.setItem("signData", JSON.stringify(state.signData));
    },
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
    sortProducts(state, action) {
      state.searchArr=action.payload
    },
    filterProducts(state, action) {
      state.searchArr = action.payload;
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
} = commerceSlice.actions;
export default commerceSlice.reducer;
