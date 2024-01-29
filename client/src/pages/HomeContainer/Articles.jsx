import React, { useState, useEffect } from "react";
import { useGetCollectionsQuery } from "../../services/jsonServerApi";
import ArticleCard from "../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectSearchQuery } from '../../store/reducers/searchReducers';

import { Link } from 'react-router-dom';

const Articles = () => {
  const { isLoading, isError, isSuccess, data, error } = useGetCollectionsQuery();
  const searchQuery = useSelector(selectSearchQuery);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [filteredData, setFilteredData] = useState(null);

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 3);
  };

  useEffect(() => {
    
    // Reset visible articles to 6 when data changes
     setVisibleArticles(6);

     if (searchQuery) {
      const filteredArticles = data?.filter((collection) =>
        collection?.name.toLowerCase().includes(searchQuery.toLowerCase()) || collection?.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredArticles);
    } else {
      setFilteredData(null);
    }
  
    
  }, [data, searchQuery]);

  return (
    <section className="container mx-auto flex flex-col md:gap-x-5 gap-y-5 px-5 py-10 bg-dark-hard">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {(filteredData || data)?.slice(0, visibleArticles).map((collection,index) => (
          <ArticleCard key={index} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" collection={collection} />
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
