import { configureStore } from "@reduxjs/toolkit";
import commerceSlice from "./commerceSlice";
const store = configureStore({
  reducer: {
    commerceSlice,
  },
});

export default store;
