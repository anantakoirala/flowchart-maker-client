"use client";
import AuthProvider from "@/ContextProvider/AuthProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <AuthProvider>
      <div>{children}</div>
    </AuthProvider>
  );
};

export default layout;
