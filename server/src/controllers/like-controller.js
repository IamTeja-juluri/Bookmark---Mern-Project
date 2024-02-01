const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { Like, Collection } = require("../models");

async function toggleLike(req, res) {
  try {
    const {collectionId} = req.params
    const userId = req.user._id
    const existingLike = await Like.findOne({user:userId,collection:collectionId})
    const collection = await Collection.findOne({_id:req.params.collectionId})
    let response
    if(existingLike){
        collection.likes.pull(existingLike._id)
        await collection.save()
        response = await existingLike.deleteOne()
        response = {...response.toObject(),status:'Disliked'}
    }
    else{
        const newLike = new Like({user:userId,collection:collectionId})
        response=await newLike.save()
        collection.likes.push(response)
        await collection.save()
        response = {...response.toObject(),status:'Liked'}
    }
    SuccessResponse.data=response
    return res.
               status(StatusCodes.OK)
               .json(SuccessResponse)
  
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  toggleLike
};
