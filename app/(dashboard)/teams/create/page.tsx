"use client";
import { restApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleApiError } from "@/lib/handleApiError";
import { useCreateTeamMutation } from "@/redux/team/teamApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const formSchema = z.object({
  name: z.string(),
});

const Page = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createTeam, { isError, isLoading, isSuccess, error }] =
    useCreateTeamMutation();
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const submitForm = async (data: z.infer<typeof formSchema>) => {
    try {
      // const response = await restApi.post("/api/v1/team/create-team", data);

      createTeam(data);
      // console.log("response", response);

      // route.push("/dashboard");
    } catch (error) {
      console.log("error heree ayaya", error);
      // handleApiError(error);
    }
    console.log("data", data);
  };

  useEffect(() => {
    if (error) {
      handleApiError(error);
    }
    if (isSuccess) {
      route.push("/dashboard");
    }
  }, [isSuccess, error]);
  return (
    <div className="px-6 md:px-16 my-16">
      <Image src={"/logo-1.png"} alt="" width={100} height={100} />
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-[40px] py-3">
          What should we call your team
        </h2>
        <h2 className="text-gray-500">
          You can always change this later from settings
        </h2>
        {/* Add a form tag */}
        <form
          onSubmit={handleSubmit(submitForm)} // This handles the form submission
          className="mt-7 w-[40%]"
        >
          <label htmlFor="team-name" className="text-gray-500">
            Team Name
          </label>
          <Input
            id="team-name" // Add an id for accessibility
            placeholder="Team Name"
            className="mt-3"
            {...register("name", { required: true })}
          />
          {errors && errors.name && (
            <span className="text-red-500">{errors?.name?.message}</span>
          )}
          <Button
            className="bg-blue-500 mt-9 w-full hover:bg-blue-600"
            type="submit" // Change to "submit" to trigger form submission
            disabled={isLoading}
          >
            Create Team
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
