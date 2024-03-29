import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { images } from "../constants";
import { Link } from "react-router-dom";
import EditCollection from "../Modals/EditCollection";
import {
  useDeleteCollectionsMutation,
  useGetLikesQuery,
  useGetLikesStatusQuery,
  useToggleLikeMutation,
} from "../services/jsonServerApi";
import toast from "react-hot-toast";

const ArticleCard = ({ className, collection }) => {
  const [like, setlike] = useState(false);
  const [updateLikes] = useToggleLikeMutation();
  const userState = useSelector((state) => state.user);
  const { isLoading, isError, isSuccess, data, error } = useGetLikesQuery(
    collection._id
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteCollections, response] = useDeleteCollectionsMutation();
  
  const {data:likeStatus} = useGetLikesStatusQuery(
    collection._id
  );



  useEffect(() => {
    if(likeStatus?.data === "Liked")
      setlike(true);

    console.log(collection.name + " " + likeStatus?.data);
  },[likeStatus])

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async () => {
    
    const isConfirmed = window.confirm("Are you sure you want to delete this collection?");
  
    
    if (isConfirmed) {
      try {
        
        await deleteCollections(collection);
        toast.success(`Collection deleted successfully`);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete collection");
      }
    }
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
        toast.error(error.data.error);
      });
  };

  return (
    <div
      className={`rounded-xl overflow-hidden bg-dark-hard shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)] ${className}`}
    >
      <Link
        to={collection.name + "/bookmarks"}
        state={{ collectionId: collection._id, authorId: collection.userId }}
      >
        <img
          src={collection.image?.filePath || images.Cta}
          alt="title"
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5 bg-dark-hard">
        <div className="flex justify-between mb-2 items-center">
          <h2 className="font-roboto font-bold text-xl text-white md:text-xl lg:text-2xl">
            {collection.name}
          </h2>
          <div className="flex space-x-2 items-center">
            {userState.userInfo && userState.userInfo._id === collection.userId ? (
              <div className="flex space-x-2 items-center" >
                <button
                  className="text-white mx-2 rounded"
                  onClick={handleEditClick}
                >
                  <img
                    src={images.editButton}
                    className="w-auto h-8"
                    alt="Edit"
                  />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="text-white rounded"
                >
                  <img
                    src={images.deleteButton}
                    className="w-auto h-8"
                    alt="Delete"
                  />
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <p className="text-slate-300 mt-3 text-sm">{collection.description}</p>

        <div className="flex items-center" onClick={handleLikeChanges}>
          {like && userState?.userInfo ? (
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
          <p className="ml-auto text-white">
            {new Date(collection.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="ml-auto text-white">
            Authored By : {collection.authorName}
          </p>
        </div>
      </div>
      <EditCollection
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        collectionData={{ ...collection }}
      />
    </div>
  );
};

export default ArticleCard;
