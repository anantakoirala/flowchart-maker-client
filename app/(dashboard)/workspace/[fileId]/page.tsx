"use client";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import dynamic from "next/dynamic";

// Dynamically import DocumentEditor without SSR
const DocumentEditor = dynamic(() => import("../_components/DocumentEditor"), {
  ssr: false,
});

const Canvas = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <WorkspaceHeader />
      {/* workspace layout */}

      <div className="flex md:flex-row flex-col w-full">
        <div className="h-[calc(100vh-200px)] md:h-screen w-full ">
          <DocumentEditor />
        </div>
        <div className="h-[calc(100vh-200px)] md:h-screen w-full  border-l">
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default Page;
