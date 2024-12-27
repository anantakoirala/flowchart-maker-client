"use client";
import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api/api";
import { teamSlice } from "./team/teamSlice";
import { fileSlice } from "./file/flieSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [teamSlice.name]: teamSlice.reducer,
    [fileSlice.name]: fileSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
