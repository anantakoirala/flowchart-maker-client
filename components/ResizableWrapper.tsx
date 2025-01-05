"use client";

import React, { useState, useEffect, MouseEvent, ReactNode } from "react";

interface ResizableWrapperProps {
  children: ReactNode;
}

const ResizableWrapper: React.FC<ResizableWrapperProps> = ({ children }) => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 200,
    height: 200,
  });
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [startSize, setStartSize] = useState<{ width: number; height: number }>(
    {
      width: 200,
      height: 200,
    }
  );

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement>,
    direction: string
  ) => {
    e.preventDefault(); // Prevent unwanted selection during drag
    setIsResizing(true);
    setResizeDirection(direction);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize(size);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    setSize((prevSize) => {
      const newSize = { ...prevSize };

      if (resizeDirection.includes("right")) {
        newSize.width = Math.max(50, startSize.width + dx);
      }
      if (resizeDirection.includes("left")) {
        newSize.width = Math.max(50, startSize.width - dx);
      }
      if (resizeDirection.includes("bottom")) {
        newSize.height = Math.max(50, startSize.height + dy);
      }
      if (resizeDirection.includes("top")) {
        newSize.height = Math.max(50, startSize.height - dy);
      }

      return newSize;
    });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove as any);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: "relative",
        border: "1px solid gray",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px",
        transition: isResizing ? "none" : "all 0.2s ease", // Smooth transition
      }}
    >
      {children}
      {/* Resizing Handles */}
      <div
        onMouseDown={(e) => handleMouseDown(e, "top-left")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          top: -3,
          left: -3,
          cursor: "nw-resize",
        }}
      ></div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "top-right")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          top: -3,
          right: -3,
          cursor: "ne-resize",
        }}
      ></div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          bottom: -3,
          left: -3,
          cursor: "sw-resize",
        }}
      ></div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          bottom: -2,
          right: -2,
          cursor: "se-resize",
        }}
      ></div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "top")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          top: -4,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "n-resize",
        }}
      ></div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          bottom: -4,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "s-resize",
        }}
      ></div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "left")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          left: -4,
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "w-resize",
        }}
      ></div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "right")}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "red",
          right: -4,
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "e-resize",
        }}
      ></div>
    </div>
  );
};

export default ResizableWrapper;
