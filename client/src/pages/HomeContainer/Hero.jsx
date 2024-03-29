import React from "react";
import { FiSearch } from "react-icons/fi";
import { images } from "../../constants";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  selectSearchQuery,
} from "../../store/reducers/searchReducers";

const Hero = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  const handleSearchInputChange = (e) => {
    const newSearchQuery = e.target.value;
    dispatch(setSearchQuery(newSearchQuery));
  };



  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row bg-dark-hard">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-white md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Get the most popular bookmarks
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Unlock the collective wisdom of the web with public bookmarks, turning
          a solitary browsing experience into a vibrant exchange of curated
          treasures
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
            <input
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search article"
            />
          </div>
       
        </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              Software Development
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              Devops
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              Freelancing
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              Remote Jobs
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              UI/UX
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img
          className=""
          src={images.HeroDisplay}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};

export default Hero;
