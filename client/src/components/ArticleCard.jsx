import React, { useState } from "react";

import { images } from "../constants";
import { Link } from "react-router-dom";
import EditCollection from "../Modals/EditCollection";
import {
  useGetLikesQuery,
  useToggleLikeMutation,
} from "../services/jsonServerApi";
import toast from "react-hot-toast";

const ArticleCard = ({ className, collection }) => {
  const [like, setlike] = useState(false);
  const [updateLikes] = useToggleLikeMutation();
  const { isLoading, isError, isSuccess, data, error } = useGetLikesQuery(
    collection._id
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleLikeChanges = async () => {
    updateLikes({ collectionId: collection._id })
      .unwrap()
      .then(() => {
        if (!like) {
          toast.success("You have liked this collection");
        } else {
          toast.success("You have disliked this collection");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.message);
      });
  };

  return (
    <div
      className={`rounded-xl overflow-hidden bg-dark-hard shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)] ${className}`}
    >
      <Link
        to={{
          pathname: `/${collection.name}/bookmarks`,
          state: { collectionId: "hds", authorId: "jdbhewb" },
        }}
      >
        <img
          src={collection.image?.filePath || images.Cta}
          alt="title"
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5 bg-dark-hard">
        <div className="flex flex-grow justify-between mb-2 items-center">
          <h2 className="font-roboto font-bold text-xl text-white md:text-xl lg:text-2xl">
            {collection.name}
          </h2>
          <div className="flex space-x-2 items-center">
            <button className="text-white mx-2 rounded" onClick={handleEditClick}>
              <img src={images.editButton} className="w-auto h-8" alt="Edit" />
            </button>
            <button className="text-white rounded">
              <img
                src={images.deleteButton}
                className="w-auto h-8"
                alt="Delete"
              />
            </button>
          </div>
        </div>
        <p className="text-slate-300 mt-3 text-sm">{collection.description}</p>

        <div className="flex items-center" onClick={handleLikeChanges}>
          {like ? (
            <button className="">
              <img
                src={images.liked}
                onClick={() => setlike(false)}
                className="w-8 object-center h-8"
              ></img>
            </button>
          ) : (
            <button className="">
              <img
                src={images.heart}
                onClick={() => setlike(true)}
                className="w-8 object-center h-8"
              ></img>
            </button>
          )}

          <p className="ml-2 mr-2 text-white">{data?.data?.likes}</p>
          <span className="text-blue-500 text-3xl">&#128278;</span>
          <p className="mr-2 text-white">200</p>
          <p className="ml-auto text-white">
            Authored By : {collection.authorName}
          </p>
        </div>
      </div>
      <EditCollection
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        collectionData={collection} 
      />
    </div>
  );
};

export default ArticleCard;
