// src/app/store.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export default rootReducer;
