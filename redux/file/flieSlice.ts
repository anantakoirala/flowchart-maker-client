import { File } from "@/types/File";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  progressCount: number;
  files: File[];
  document: string;
};

const initialState: initialState = {
  progressCount: 0,
  files: [],
  document: "",
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
    setDocument: (state, action) => {
      state.document = action.payload;
    },
  },
});

export const { setProgressCount, setFiles, setDocument } = fileSlice.actions;
export default fileSlice.reducer;
