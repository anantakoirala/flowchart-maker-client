import React from "react";
import SideBar from "./_components/SideBar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-4">
        {/* sidebar */}
        <div className="">
          <SideBar />
        </div>
        <div className="grid-cols-3">{children}</div>
      </div>
    </div>
  );
};

export default layout;
