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
        <div className="h-screen w-72 fixed">
          <SideBar />
        </div>
        <div className="col-span-4 ml-72">{children}</div>
      </div>
    </div>
  );
};

export default layout;
