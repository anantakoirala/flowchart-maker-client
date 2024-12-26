import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import SidebarTopSection from "./SidebarTopSection";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <div className="bg-gray-100 h-screen fixed w-72 border-r p-6">
      <SidebarTopSection />
    </div>
  );
};

export default SideBar;
