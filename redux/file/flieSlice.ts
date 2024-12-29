import { File } from "@/types/File";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  progressCount: number;
  files: File[];
};

const initialState: initialState = {
  progressCount: 0,
  files: [],
};

export const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {
    setProgressCount: (state, action) => {
      state.progressCount = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { setProgressCount, setFiles } = fileSlice.actions;
export default fileSlice.reducer;
