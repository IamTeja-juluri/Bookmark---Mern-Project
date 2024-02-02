const { StatusCodes } = require("http-status-codes");
const { CollectionService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { fileSizeFormatter } = require("../utils/common/fileUpload");
const cloudinary = require("cloudinary").v2;

async function createCollection(req, res) {
  try {
    const authorName = req.user.name;
    const userId = req.user._id;
    const { name, description, collectionType } = req.body;
    let fileData = {};
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "CollectionImages",
          resource_type: "image",
        });
      } catch (error) {
        throw new AppError(
          "Image could not be uploaded",
          StatusCodes.EXPECTATION_FAILED
        );
      }
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
    const newCollection = await CollectionService.createCollection({
      userId,
      authorName,
      name,
      description,
      collectionType,
      image: fileData,
    });
    SuccessResponse.data = newCollection;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllCollections(req, res) {
  try {
    const allCollections = await CollectionService.getAllCollections(req);
    return res.status(StatusCodes.OK).json(allCollections);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateCollection(req, res) {
  try {
    const { collectionId, authorId } = req.query;
    const userId = req.user._id;
    if (authorId.toString() !== userId.toString())
      throw new AppError(
        "You are not authorised to perform this action",
        StatusCodes.FORBIDDEN
      );
    const {name,collectionType,description} = req.body
    const updateFields  = {};
    if (name) updateFields.name= name
    if (collectionType) updateFields.collectionType = collectionType
    if (description) updateFields.description = description
    const updatedCollection = await CollectionService.updateCollection(collectionId,updateFields)
    SuccessResponse.data = `Collection ${updatedCollection.name} has been updated with new details`
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteCollection(req, res) {
  try {
    const { collectionId, authorId } = req.query;
    const userId = req.user._id;
    if (authorId.toString() !== userId.toString())
      throw new AppError(
        "You are not authorised to perform this action",
        StatusCodes.FORBIDDEN
      );
    const deletedLink = await CollectionService.deleteCollection({
      _id: collectionId,
      userId: authorId,
    });
    if (deletedLink.deletedCount > 0)
      SuccessResponse.data = "Collection has been deleted";
    else
      SuccessResponse.data = "Something went wrong while deleting collection";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCollection,
  getAllCollections,
  updateCollection,
  deleteCollection,
};
