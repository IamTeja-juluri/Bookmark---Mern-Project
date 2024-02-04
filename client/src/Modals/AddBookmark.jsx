import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import toast from "react-hot-toast";

import { IoClose } from "react-icons/io5";

import {
  useGetCollectionsQuery,
  useAddLinksMutation,
} from "../services/jsonServerApi";

const AddBookmark = ({ isOpen, onClose, state }) => {
  const navigate = useNavigate();
  const { collection } = useParams();
  const userState = useSelector((state) => state.user);
  // const { isError, isSuccess, data, error } = useGetCollectionsQuery();
 
  const [addLinks] = useAddLinksMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      link: "",
    },
    mode: "onChange",
  });

  const closeHandler = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const submitHandler = (data) => {
    const { linkName, link } = data;

    addLinks({ linkName, link, state })
      .unwrap()
      .then(() => {
        toast.success("Link added successfully!");
      })
      .catch((error) => {
        toast.error(error.data.error.explanation);
      })
      .finally(() => closeHandler());
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div className="min-h-screen bg-transparent flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
              className="absolute top-6 right-4 z-10 cursor-pointer text-gray-600 hover:text-gray-800 text-3xl"
              onClick={closeHandler}
            >
              <IoClose />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-24 py-4 bg-white shadow-lg sm:rounded-3xl sm:py-16">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-3xl text-blue-400 font-semibold">
                    Add Bookmark
                  </h1>
                </div>
                <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
                  <div className="divide-y divide-gray-200">
                    <div className="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input
                          id="linkName"
                          type="text"
                          {...register("linkName", {
                            minLength: {
                              value: 1,
                              message:
                                "link name length must be at least 1 character",
                            },
                            required: {
                              value: true,
                              message: "link name is required",
                            },
                          })}
                          placeholder="Enter link name"
                          className={`peer text-base placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
                            errors.linkName
                              ? "border-red-500"
                              : "border-[#c3cad9]"
                          }`}
                        />
                        {errors.linkName?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.linkName?.message}
                          </p>
                        )}
                        <label
                          htmlFor="linkName"
                          className="absolute left-0 -top-3.5 text-black-600 font-bold text-base"
                        >
                          Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          id="link"
                          type="text"
                          {...register("link", {
                            minLength: {
                              value: 10,
                              message:
                                "link length must be at least 1 character",
                            },
                            required: {
                              value: true,
                              message: "link is required",
                            },
                          })}
                          placeholder="Enter link"
                          className={`peer placeholder-transparent text-base h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
                            errors.link ? "border-red-500" : "border-[#c3cad9]"
                          }`}
                        />
                        {errors.link?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.link?.message}
                          </p>
                        )}
                        <label
                          htmlFor="link"
                          className="absolute left-0 -top-3.5 text-black-600 font-bold text-base"
                        >
                          Link
                        </label>
                      </div>

                      <div className="relative">
                        <button
                          type="submit"
                          disabled={!isValid}
                          className="flex bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-lg uppercase font-bold shadow-md rounded-full px-5 py-2"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookmark;
