import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";
import SuggestedBookmarks from "./SuggestedBookmarks";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useGetLinksQuery } from "../../services/jsonServerApi";
import toast from "react-hot-toast";

const postsData = [
  {
    _id: "1",
    image: images.Post,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    image: images.Post,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    image: images.Post,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "4",
    image: images.Post,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  
];

const Bookmarks = () => {
  const location = useLocation();
  const { collection } = useParams();

  const { isLoading, isError, isSuccess, data, error } = useGetLinksQuery(collection);
  
// useEffect(() => {
//   if(isError){
//         toast.error(error.data.message);
//       }
// }, [data])

  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "LinksPage", link: `${location.pathname}` },
  ];



  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1 lg:flex-2">
          <BreadCrumbs data={breadCrumbsData} />
          <h1 className="text-xl font-medium font-roboto mt-4 p-3 text-white md:text-[26px]">
            {collection}
          </h1>
          
          <SuggestedBookmarks
            header= {"Your links library for " + collection}
            posts={data?.data}
            category={collection}
            className="mt-8 lg:mt-0 lg:flex-1"
          />
        </article>
        
      </section>
    </MainLayout>
  );
};

export default Bookmarks;
