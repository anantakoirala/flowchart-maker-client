import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  progressCount: number;
};

const initialState: initialState = {
  progressCount: 0,
};

export const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {
    setProgressCount: (state, action) => {
      state.progressCount = action.payload;
    },
  },
});

export const { setProgressCount } = fileSlice.actions;
export default fileSlice.reducer;
