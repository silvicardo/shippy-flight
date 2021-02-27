import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

const storeToolkit = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootReduxState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof storeToolkit.dispatch;

export default storeToolkit;
