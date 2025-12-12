import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice.js";
import authReducer from "../slices/authSlice.js";

const store = configureStore({
    reducer: {
        auth:authReducer
    }
});

export default store;