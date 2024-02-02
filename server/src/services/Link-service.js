const { LinkRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const linkRepository = new LinkRepository();

async function createLink(data) {
  try {
    const link = await linkRepository.create(data);
    return link;
  } catch (error) {
    console.log("Got error", error);
    throw new AppError(
      "Cannot create a new link Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getLinks(data) {
  try {
    const links = await linkRepository.get(data);
    const sanitizedDataArray = links.map((link) => {
      const { __v, ...rest } = link._doc;
      return rest;
    });
    return sanitizedDataArray;
  } catch (error) {
    throw new AppError("Cannot get all links", StatusCodes.BAD_REQUEST);
  }
}

async function getLatestLinks(data) {
  try {
    const links = await linkRepository.getLatestLinks(data);
    const sanitizedDataArray = links.map((link) => {
      const { __v, ...rest } = link._doc;
      return rest;
    });
    return sanitizedDataArray;
  } catch (error) {
    throw new AppError("Cannot get latest links", StatusCodes.BAD_REQUEST);
  }
}

async function updateLink(id, data) {
  try {
    const updatedLink = await linkRepository.UpdateOne(id, data);
    return updatedLink;
  } catch (error) {
    throw new AppError("Update failed", StatusCodes.NOT_FOUND);
  }
}

async function deleteLink(data) {
  try {
    const link = await linkRepository.deleteOne(data);
    return link;
  } catch (error) {
    throw new AppError("Cannot delete this link", StatusCodes.BAD_REQUEST);
  }
}

module.exports = {
  createLink,
  getLinks,
  getLatestLinks,
  updateLink,
  deleteLink,
};
