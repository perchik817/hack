import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;