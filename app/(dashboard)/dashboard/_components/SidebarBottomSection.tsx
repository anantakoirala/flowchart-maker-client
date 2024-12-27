"use client";
import { LuArchive, LuFlag, LuGithub } from "react-icons/lu";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Span } from "next/dist/trace";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useCreateFileMutation } from "@/redux/file/fileApi";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/handleApiError";
import { setProgressCount } from "@/redux/file/flieSlice";

const newFileSchema = z.object({
  title: z.string(),
});

type Props = {};
const menuList = [
  {
    id: 1,
    name: "Getting Started",
    icon: LuFlag,
    path: "",
  },
  {
    id: 2,
    name: "Github",
    icon: LuGithub,
    path: "",
  },
  {
    id: 3,
    name: "Archive",
    icon: LuArchive,
    path: "",
  },
];

const SidebarBottomSection = (props: Props) => {
  const dispatch = useDispatch();
  const [
    createFile,
    { data: successData, isLoading, isError, isSuccess, error },
  ] = useCreateFileMutation();
  const { activeTeam } = useSelector((state: RootState) => state.team);
  const { progressCount } = useSelector((state: RootState) => state.file);
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof newFileSchema>>({
    resolver: zodResolver(newFileSchema),
    defaultValues: {
      title: "",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = form;

  const submitTitle = async (data: z.infer<typeof newFileSchema>) => {
    setOpen(false);

    reset();
    const dataToBeSubmitted = {
      title: data.title,
      teamId: activeTeam?._id,
    };
    try {
      const response = await createFile(dataToBeSubmitted).unwrap(); // Unwrap to handle success or error

      // Display success toast
      toast.success("File created successfully!");
      dispatch(setProgressCount(response.numberOfFiles));
    } catch (error: any) {
      // Display error toast
      handleApiError(error);
    }
  };

  const progressPercentage = (progressCount / 5) * 100;
  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex gap-2 p-1 items-center px-2 text-[14x] hover:bg-gray-100 rounded-md cursor-pointer"
        >
          <menu.icon className="h-4 w-4" />
          {menu.name}
        </h2>
      ))}
      {/* Add new file button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2 items-end">
                <Input
                  placeholder="Write file name"
                  className="mt-3"
                  {...register("title", { required: true })}
                />
                {errors && errors?.title && (
                  <span className="text-red-600 text-sm text-left w-full">
                    {errors?.title?.message}
                  </span>
                )}
                <Button
                  className="bg-blue-600 hover:bg-blue-700 w-24"
                  onClick={handleSubmit(submitTitle)}
                >
                  Save
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3"
        onClick={() => setOpen((prev) => !prev)}
      >
        New File
      </Button>

      {/* Progress bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div
          className="h-4  bg-blue-600 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <h2 className="text-[12px] mt-3">
        <strong>{progressCount}</strong> of <strong>5</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">
        Upgrade your plan for unlimited access
      </h2>
    </div>
  );
};

export default SidebarBottomSection;
