import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import loaderReducer from "./reducers/loaderSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    loader: loaderReducer,
  },
});

export { store };
