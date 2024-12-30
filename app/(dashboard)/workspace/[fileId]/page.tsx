"use client";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import dynamic from "next/dynamic";

// Dynamically import DocumentEditor without SSR
const DocumentEditor = dynamic(() => import("../_components/DocumentEditor"), {
  ssr: false,
});

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <WorkspaceHeader />
      {/* workspace layout */}

      <div className="flex md:flex-row flex-col">
        <div className="h-[calc(100vh-200px)] md:h-screen w-full bg-green-300">
          <DocumentEditor />
        </div>
        <div className="h-[calc(100vh-200px)] md:h-screen w-full bg-blue-300"></div>
      </div>
    </div>
  );
};

export default Page;
