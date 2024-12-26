"use client";
import { ChevronDown, LogOut, Settings, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useFindAllTeamsQuery } from "@/redux/team/teamApi";
import { Team } from "@/types/Team";
import { useRouter } from "next/navigation";
import { restApi } from "@/api";

type Props = {};

type MenuItem = {
  id: number;
  name: string;
  path: string;
  icon: LucideIcon; // Type for the icon
};

const SidebarTopSection = (props: Props) => {
  const route = useRouter();
  const { data, isLoading } = useFindAllTeamsQuery();
  const [activeTeam, setActiveTeam] = useState<Team>();
  const menu: MenuItem[] = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  useEffect(() => {
    if (data) {
      console.log("data", data.myTeams);
      setActiveTeam(data.myTeams[0]);
    }
  }, [data]);

  const onMenuClick = (item: MenuItem) => {
    if (item.path) {
      route.push(item.path);
    }
  };

  const logOut = async () => {
    restApi
      .get("/api/v1/auth/logout")
      .then((res) => {
        console.log("res", res.data.success);
        route.push("/");
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-lg cursor-pointer">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between gap-6 w-full">
            <Image src="/logo-1.png" alt="logo" width={40} height={40} />
            <div className="flex-grow">
              <h2 className="font-bold text-[17px]">{activeTeam?.name}</h2>
            </div>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4">
          {/* Team Section */}
          <div className="">
            {data.myTeams.map((team: Team) => (
              <h2
                className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer ${
                  activeTeam?._id === team._id && "bg-blue-500 text-white"
                }`}
                onClick={() => setActiveTeam(team)}
              >
                {team.name}
              </h2>
            ))}
          </div>
          <Separator className="mt-2" />
          {/* Option Section */}
          <div className="">
            {menu.map((menu, index) => (
              <h2
                key={index}
                className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg text-sm cursor-pointer"
                onClick={() => onMenuClick(menu)}
              >
                <menu.icon className="h-4 w-4" />
                {menu.name}
              </h2>
            ))}
            <h2
              className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg text-sm cursor-pointer"
              onClick={logOut}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </h2>
          </div>
          <Separator className="mt-2" />
          {/* User Info */}
          <div className="mt-2 flex gap-2 items-center">
            <Image
              src={"/logo-1.png"}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="">
              <h2 className="text-[14px] font-bold">Username</h2>
              <h2 className="text-[12px] text-gray-500">user@email.com</h2>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SidebarTopSection;
