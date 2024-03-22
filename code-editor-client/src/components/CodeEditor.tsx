"use client";
import React from "react";
import Button from "./ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { submit } from "../../types/submit";
const CodeEditor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<submit>({
    defaultValues: {
      stdin: "",
      languageCode: 52,
    },
  });
  const onSubmit: SubmitHandler<submit> = async (data) => {
    try {
      const response = await fetch(
        `https://take-you-forward.vercel.app/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit the code");
      }
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      toast.success("Code submitted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit the code");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-screen-xl h-[90vh] pt-16  text-left  mt-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-5 max-w-[1000px] md:w-[60vw]">
          <div className="relative">
            <label
              htmlFor="user_name"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              {...register("username", {
                required: "User Name is required",
                minLength: {
                  value: 3,
                  message: "Username should be atleast of 3 characters",
                },
                validate: (value) => {
                  if (value.trim() == "") return "Username can't be empty";
                },
              })}
              className={`bg-gray-50 border  border-gray-300 text-gray-900 text-sm ${
                errors.username && "border-red-500"
              } rounded-lg focus:ring-tuf focus:border-tuf block w-full p-2.5  `}
              placeholder="Enter your user name"
            />
            {errors.username && (
              <div className="text-red-500  text-xs">
                {errors.username.message}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="countries"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Choose a Language
            </label>
            <select
              {...register("languageCode")}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tuf focus:border-tuf block w-full p-2.5  "
            >
              <option value={52}>C++</option>
              <option value={91}>Java</option>
              <option value={71}>Python</option>
              <option value={93}>JavaScript</option>
              <option value={95}>Go</option>
            </select>
            {errors.languageCode && (
              <div className="text-red-500">{errors.languageCode.message}</div>
            )}
          </div>
        </div>

        <div className=" flex flex-col md:flex-row gap-5">
          <div className="relative">
            <textarea
              id="code"
              {...register("code", {
                required: "Code is required",
                minLength: { value: 5, message: "Code is too short" },
                validate: (value) => {
                  if (value.trim() == "") return "Code can't be empty";
                },
              })}
              className={`block p-2.5 max-w-[1000px] w-[90vw] md:w-[60vw] h-[75vh] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-tuf focus:border-tuf  ${
                errors.code && "border-red-500"
              }`}
              placeholder="Write your code here..."
            ></textarea>
            {errors.code && (
              <div className="text-red-500 absolute text-xs">
                {errors.code.message}
              </div>
            )}
          </div>
          <div className="flex flex-row md:flex-col gap-2 items-end md:items-start  justify-between ">
            <textarea
              id="stdin"
              rows={10}
              className="block p-2.5 max-w-[300px] w-[50vw] md:w-[15vw]  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-tuf focus:border-tuf    "
              placeholder="Enter the input here..."
            ></textarea>
            <Button isLoading={isSubmitting} info="Run" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CodeEditor;
