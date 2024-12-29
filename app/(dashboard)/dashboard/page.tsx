import React from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="p-8">
      <Header />
      <FileList />
    </div>
  );
};

export default Page;
