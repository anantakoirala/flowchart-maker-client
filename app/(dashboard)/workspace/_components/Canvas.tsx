"use client";
import { MainMenu } from "@excalidraw/excalidraw";
import dynamic from "next/dynamic";
import React from "react";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

type Props = {};

const Canvas = (props: Props) => {
  return (
    <div className="h-[90%]">
      <Excalidraw
        theme="light"
        UIOptions={{
          canvasActions: {
            saveToActiveFile: true,
            export: false,
            loadScene: false,
            toggleTheme: false,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
      </Excalidraw>
    </div>
  );
};

export default Canvas;
