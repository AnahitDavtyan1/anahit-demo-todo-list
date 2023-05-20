import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    tasksLoading: false,
    editLoading: false,
    deleteLoading: false,
    addTaskLoading: false,
    contactFormLoader: false,
  },
  reducers: {
    setLoader: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
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

const { actions, reducer } = loaderSlice;

export const { setLoader } = actions;

export default loaderSlice.reducer;
