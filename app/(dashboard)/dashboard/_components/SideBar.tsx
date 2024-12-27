import React from "react";
import SidebarTopSection from "./SidebarTopSection";
import SidebarBottomSection from "./SidebarBottomSection";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <div className=" h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SidebarTopSection />
      </div>

      <div className="">
        <SidebarBottomSection />
      </div>
    </div>
  );
};

export default SideBar;
