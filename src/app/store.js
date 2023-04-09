import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../features/state/stateSlice";

const store = configureStore({
  reducer: {
    allState: stateReducer,
  },
});

export default store;
