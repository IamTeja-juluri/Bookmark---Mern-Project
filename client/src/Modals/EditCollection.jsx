import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { IoClose } from "react-icons/io5";
import { addBookmark } from "../services/index/users";
import {
  useGetCollectionsQuery,
  useUpdateCollectionsMutation,
} from "../services/jsonServerApi";

const EditCollection = ({ isOpen, onClose, collectionData }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  // const { isError, isSuccess, data, error } = useGetCollectionsQuery();

  const [updateCollections] = useUpdateCollectionsMutation();


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue, // Access the setValue function to set form values
  } = useForm({
    defaultValues: {
      name: collectionData.name || "", 
      description: collectionData.description || "", 
      collectionType: collectionData.collectionType || "", 
      
    },
    mode: "onChange",
  });



  const submitHandler = (data) => {
    // const { name, description, collectionType, image } = data;
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("collectionType", collectionType);
    
    
    // updateCollections(formData)
    //   .unwrap()
    //   .then(() => {
    //     toast.success("Collection added successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error(error.data.message);
    //   });
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
              onClick={onClose}
            >
              <IoClose />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-24 py-4 bg-white shadow-lg sm:rounded-3xl sm:py-16">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-3xl text-blue-400 font-semibold">
                    Edit Collection
                  </h1>
                </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="divide-y divide-gray-200">
                    <div className="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          {...register("name", {
                            minLength: {
                              value: 1,
                              message:
                                "Collection name length must be at least 1 character",
                            },
                            required: {
                              value: true,
                              message: "Collection name is required",
                            },
                          })}
                          placeholder="Enter Collection name"
                          className={`peer placeholder-transparent h-10 pt-3 text-base w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
                            errors.name ? "border-red-500" : "border-[#c3cad9]"
                          }`}
                        />
                        {errors.name?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name?.message}
                          </p>
                        )}
                        <label
                          htmlFor="name"
                          className="absolute left-0 -top-3.5 text-black-600 font-bold text-base"
                        >
                          Collection Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          id="description"
                          type="text"
                          {...register("description", {
                            minLength: {
                              value: 1,
                              message:
                                "Description name length must be at least 1 character",
                            },
                            required: {
                              value: true,
                              message: "Description is required",
                            },
                          })}
                          placeholder="Enter description"
                          className={`peer placeholder-transparent text-base h-10 pt-3 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
                            errors.description
                              ? "border-red-500"
                              : "border-[#c3cad9]"
                          }`}
                        />
                        {errors.description?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.description?.message}
                          </p>
                        )}
                        <label
                          htmlFor="description"
                          className="absolute left-0 -top-3.5 text-black-600 font-bold text-base "
                        >
                          Description
                        </label>
                      </div>
                      
                      <div className="relative">
                        <select
                          id="collectionType"
                          name="collectionType"
                          {...register("collectionType", {
                            required: {
                              value: true,
                              message: "CollectionType is required",
                            },
                          })}
                          className={`peer placeholder-transparent text-base h-10 pt-3 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
                            errors.collectionType
                              ? "border-red-500"
                              : "border-[#c3cad9]"
                          }`}
                        >
                          <option value="Public" className="text-base">
                            Public
                          </option>
                          <option value="Private" className="text-base">
                            Private
                          </option>
                        </select>
                        {errors.collectionType?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.collectionType?.message}
                          </p>
                        )}
                        <label
                          htmlFor="collectionType"
                          className="absolute left-0 -top-3.5 text-black-600 font-bold text-base "
                        >
                          Collection Type
                        </label>
                      </div>
                      <div className="relative">
                        <button
                          type="submit"
                          disabled={!isValid }
                          onClick={onClose}
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

export default EditCollection;
