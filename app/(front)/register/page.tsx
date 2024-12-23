"use client";
import { restApi } from "@/api";
import { handleApiError } from "@/lib/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {};

const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().nonempty("Password is required"), // Ensures password is not empty,
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be attached to confirmPassword
  });

const Page = (props: Props) => {
  const route = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await restApi.post("/api/v1/auth/register", data);
      toast.success(response?.data?.message);
      route.push("/login");

      console.log("data", data);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center h-[90vh] px-4">
      <div className="w-full sm:w-1/3 h-auto border rounded-md flex flex-col gap-6 justify-center items-center p-6 sm:p-10">
        <div className="flex flex-row items-center gap-9 justify-center">
          <span className="text-[28px] sm:text-[36px] tracking-[.48px] font-extrabold">
            Register
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 items-center"
        >
          <div className="w-full flex flex-col gap-1  ">
            <span className="text-[14px] sm:text-[16px] ">Email address</span>
            <input
              type="text"
              className="border-[1px] border-[#e8e8e8] h-12 p-2 rounded-[4px] outline-none bg-[#fafafa] focus:border-sky-300 focus:border-[2px]"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <span className="text-red-600 -mt-1 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="text-[14px] sm:text-[16px]">Password</span>
            <input
              type="password"
              className="border-[1px] border-[#e8e8e8] h-12 p-2 rounded-[4px] outline-none bg-[#fafafa] focus:border-sky-300 focus:border-[2px]"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors?.password && (
              <span className="text-red-600 -mt-1 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="text-[14px] sm:text-[16px]">Confirm Password</span>
            <input
              type="password"
              className="border-[1px] border-[#e8e8e8] h-12 p-2 rounded-[4px] outline-none bg-[#fafafa] focus:border-sky-300 focus:border-[2px]"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
            />
            {errors?.confirmPassword && (
              <span className="text-red-600 -mt-1 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <button
            className="h-12 sm:h-14 rounded-[4px] bg-[#2866df] hover:bg-[#154bb8] w-full sm:w-[250px] text-white text-sm"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
