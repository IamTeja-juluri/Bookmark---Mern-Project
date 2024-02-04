import React, { useState, useEffect } from "react";
import { useGetCollectionsQuery } from "../../services/jsonServerApi";
import ArticleCard from "../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectSearchQuery } from "../../store/reducers/searchReducers";

import { Link } from "react-router-dom";

const Articles = () => {
  const { isLoading, isError, isSuccess, data, error } =
    useGetCollectionsQuery();
  const userState = useSelector((state) => state.user);
  const searchQuery = useSelector(selectSearchQuery);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [filteredData, setFilteredData] = useState(null);
  const [filterByUser, setFilterByUser] = useState(false);
  const [filteredArticlesData, setFilteredArticlesData] = useState(data || []);

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 3);
  };

  const handleCheckboxChange = () => {
    setFilterByUser((prevFilterByUser) => !prevFilterByUser);
    let flag = !filterByUser;
    if (userState.userInfo && flag) {
      
      const tempData = data?.filter(
         (collection) => collection?.userId === userState?.userInfo._id
       );

       setFilteredArticlesData(tempData);
   }
   else{
     setFilteredArticlesData(data);
   }
   
  };

  useEffect(() => {
    setFilteredArticlesData(data);
  }, [data]);

  useEffect(() => {
    
    setVisibleArticles(6);


    if (searchQuery) {
      const filteredArticles = filteredArticlesData?.filter(
        (collection) =>
          collection?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collection?.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredArticles);
    } else {
      setFilteredData(null);
    }
  }, [data, searchQuery, filterByUser]);

  return (
    <section className="container mx-auto flex flex-col md:gap-x-5 gap-y-5 px-5 py-10 bg-dark-hard">
      {userState.userInfo ? (
        <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="filterByUserCheckbox"
          className="form-checkbox h-6 w-6 text-primary rounded border-primary focus:ring-primary"
          checked={filterByUser}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="filterByUserCheckbox" className="ml-3 text-lg font-semibold text-white">
          Filter by User
        </label>
      </div>
      
      ) : null}

      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {(filteredData || filteredArticlesData)
          ?.slice(0, visibleArticles)
          .map((collection, index) => (
            <ArticleCard
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              collection={collection}
            />
          ))}
      </div>

      {visibleArticles < data?.length && (
        <button
          className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg"
          onClick={loadMoreArticles}
        >
          <span>More articles</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      )}
    </section>
  );
};

export default Articles;
