import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search className="h-4 w-4" />
        <input type="text" placeholder="search" />
      </div>
      <div className="">{/* users image */}</div>
      <Button className="gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600">
        <Send className="h-4 w-4" /> Invite
      </Button>
    </div>
  );
};

export default Header;
