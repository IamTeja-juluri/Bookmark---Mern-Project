const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { Like } = require("../models");

async function toggleLike(req, res) {
  try {
    const { collectionId } = req.params;
    const userId = req.user._id;
    const existingLike = await Like.findOne({
      user: userId,
      collection: collectionId,
    });
    let response;
    if (existingLike) {
      response = await existingLike.deleteOne();
      response = { ...response.toObject(), status: "Disliked" };
    } else {
      const newLike = new Like({ user: userId, collection: collectionId });
      response = await newLike.save();
      response = { ...response.toObject(), status: "Liked" };
    }
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getLikesCount(req, res) {
  try {
    const { collectionId } = req.params;
    const likesCount = await Like.countDocuments({ collection: collectionId });
    SuccessResponse.data = {
      likes: likesCount
    };
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  toggleLike,
  getLikesCount,
};