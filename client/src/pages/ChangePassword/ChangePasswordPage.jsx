import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { login } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";
import { useChangePasswordMutation, useLoginUserMutation } from "../../services/jsonServerApi";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
    const [changePassword] = useChangePasswordMutation();
  



  useEffect(() => {
    
    if (!userState.userInfo) {
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const submitHandler = (data) => {
    const { oldPassword, newPassword, confirmNewPassword } = data;
        
    changePassword({ oldPassword, newPassword, confirmNewPassword })
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      })
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-white mb-8">
            Change Password
          </h1>
          <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="oldPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                {...register("oldPassword", {
                  required: {
                    value: true,
                    message: "Old Password is required",
                  },
                 
                })}
                placeholder="Enter old password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.oldPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.oldPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.oldPassword?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="newPassword"
                className="text-[#5a7184] font-semibold block"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 characters",
                  },
                })}
                placeholder="Enter new password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.newPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.newPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>

            
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmNewPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                {...register("confirmNewPassword", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                placeholder="Enter password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.confirmNewPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.confirmNewPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmNewPassword?.message}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!isValid }
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Update
            </button>
            
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ChangePasswordPage;