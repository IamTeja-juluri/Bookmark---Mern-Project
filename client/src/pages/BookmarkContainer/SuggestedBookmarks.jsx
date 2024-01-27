import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from "../../constants";
import { useGetCollectionsQuery } from '../../services/jsonServerApi';

const SuggestedBookmarks = ({ className, header, posts = [], category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = posts?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(posts?.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;

    const startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-2 px-3 py-1 text-white border rounded-full ${
            i === currentPage ? 'bg-dark-hard border-cyan-400 text-cyan-400 font-bold' : 'border-dashed'
          }`}
          onClick={() => paginate(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={`w-full shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)]  rounded-lg p-4 ${className}`}>
      <h2 className="font-roboto font-medium text-slate-300 md:text-xl">{header}</h2>
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {currentItems.map((item, index) => (
          <Link key={index} to={item.link} target="_blank">
            <div className="flex p-5 text-white rounded-full bg-dark-soft shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] space-x-3 flex-nowrap items-center">
            {/* {Array.isArray(imgUrl) && imgUrl.length > 0 && (
                <img
                  className="aspect-square object-cover rounded-lg w-1/5"
                  src={imgUrl[0]?.photo}
                  target="_main"
                  alt="laptop"
                />
              )} */}
              <img
                  className="aspect-square object-cover rounded-full w-24"
                  src={images.BookmarkTest}
                  target="_main"
                  alt="laptop"
                />
              <div className="text-sm font-roboto  font-medium">
                <h3 className="text-sm font-roboto font-medium md:text-base lg:text-lg">
                  {item.linkName}
                </h3>
                <span className="text-xs opacity-60">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">{renderPaginationButtons()}</div>
    </div>
  );
};

export default SuggestedBookmarks;
