import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    tasksCount: null,
  },
  reducers: {
    setTasksCount: (state, { payload }) => {
      state.tasksCount = payload;
    },
  },
});

export const { setTasksCount } = counterSlice.actions;

export default counterSlice.reducer;
