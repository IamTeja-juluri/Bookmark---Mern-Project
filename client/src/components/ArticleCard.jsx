import React from "react";

import { images } from "../constants";
import { Link } from 'react-router-dom';

const ArticleCard = ({ className, collection }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden bg-dark-hard shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)] ${className}`}
    >
      <Link to= {collection.name + '/bookmarks'} > 
      <img
        src={collection.image?.filePath || images.Cta}
        alt="title"
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
      />
      <div className="p-5 bg-dark-hard">
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