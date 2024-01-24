import React from "react";

import { images } from "../constants";
import { Link } from 'react-router-dom';

const ArticleCard = ({ className, collection }) => {
  return (
    
    <div
      className={`rounded-xl overflow-hidden bg-slate-800 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <Link to='/bookmarks'>
      <img
        src={collection.image?.filePath || images.Cta}
        alt="title"
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
      />
      <div className="p-5 bg-slate-800">
        <h2 className="font-roboto  font-bold text-xl text-white md:text-xl lg:text-2xl">
         {collection.name}
        </h2>
        <p className="text-slate-300 mt-3 text-sm">
         {collection.description}
        </p>
        <div className="flex items-center">
        <button className="text-red-500 text-4xl">&#9829;</button>
        <p className="ml-1 mr-2 text-white">500</p>
        <span className="text-blue-500 text-3xl">&#128278;</span>
        <p className="mr-2 text-white">200</p>
        <p className="ml-auto text-white">Authored By : {collection.authorName}</p>
        </div>
        </div>
      </Link>

    </div>
  );
};

export default ArticleCard;