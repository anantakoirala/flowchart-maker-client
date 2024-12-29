"use client";
import { RootState } from "@/redux/store";
import { File } from "@/types/File";
import React from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Archive, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {};

const FileList = (props: Props) => {
  const { files } = useSelector((state: RootState) => state.file);
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                Created
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                Edited
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                Author
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {files.map((file: File) => (
              <tr key={file._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {file.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {formatDistanceToNow(new Date(file.createdAt), {
                    addSuffix: true,
                  })}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {formatDistanceToNow(new Date(file.updatedAt), {
                    addSuffix: true,
                  })}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {file.createdBy.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="gap-3">
                        <Archive className="h-4 w-4" /> Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
