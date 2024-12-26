"use client";
import AuthProvider from "@/ContextProvider/AuthProvider";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div>{children}</div>
      </AuthProvider>
    </Provider>
  );
};

export default layout;
