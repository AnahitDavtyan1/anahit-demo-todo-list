import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending") && "requestId" in action.meta,
        () => true
      )
      .addMatcher(
        (action) =>
          (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) && "requestId" in action.meta,
        () => false
      );
  },
});

const { actions } = loaderSlice;

export const { setLoader } = actions;

export default loaderSlice.reducer;
