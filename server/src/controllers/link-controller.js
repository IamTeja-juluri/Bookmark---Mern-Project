const { StatusCodes } = require("http-status-codes");
const { LinkService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function createLink(req, res) {
  try {
    const authorName = req.user.name;
    const userId = req.user._id;
    const collectionId = req.query.collectionId;
    const collectionAuthor = req.query.authorId;
    if (collectionAuthor.toString() !== userId.toString())
      throw new AppError(
        `You cannot add links to other users collection`,
        StatusCodes.FORBIDDEN
      );
    const { link, linkName } = req.body;
    const collectionLink = await LinkService.createLink({
      userId,
      authorName,
      link,
      linkName,
      collectionId,
    });
    SuccessResponse.data = collectionLink;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getLinks(req, res) {
  try {
    const links = await LinkService.getLinks({
      collectionId: req.query.collectionId,
    });
    SuccessResponse.data = links;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getLatestLinks(req, res) {
  try {
    const links = await LinkService.getLinks(req.query);
    SuccessResponse.data = links;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAnyLinksByQuery(req, res) {
  try {
    return res.status(StatusCodes.OK).json(res.paginatedResults);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateLink(req, res) {
  try {
    const { linkId, authorId } = req.query;
    const userId = req.user._id;
    if (authorId.toString() !== userId.toString())
      throw new Error(
        "You are not authorised to perform this action",
        StatusCodes.UNAUTHORIZED
      );
    const { link, linkName } = req.body;
    const updateFields = {};
    if (link) updateFields.link = link;
    if (linkName) updateFields.linkName = linkName;
    const updatedLink = await LinkService.updateLink(linkId, updateFields);
    SuccessResponse.data = `Link has been updated to linkName : ${updatedLink.linkName} and link : ${updatedLink.link}`;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteLink(req, res) {
  try {
    const { linkId, authorId } = req.query;
    const userId = req.user._id;
    if (authorId.toString() !== userId.toString())
      throw new AppError(
        "You are not authorised to perform this action",
        StatusCodes.FORBIDDEN
      );
    const deletedLink = await LinkService.deleteLink({
      _id: linkId,
      userId: authorId,
    });
    if (deletedLink.deletedCount > 0)
      SuccessResponse.data = "Link has been deleted";
    else SuccessResponse.data = "Something went wrong while deleting";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createLink,
  getLinks,
  getAnyLinksByQuery,
  getLatestLinks,
  updateLink,
  deleteLink,
};
