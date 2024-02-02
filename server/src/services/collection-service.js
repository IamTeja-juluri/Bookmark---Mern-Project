const {CollectionRepository} = require("../repositories")
const {StatusCodes}=require('http-status-codes')
const AppError = require('../utils/errors/app-error')
const collectionRepository = new CollectionRepository()


async function createCollection(data){
    try{
        const newCollection = await collectionRepository.create(data);
        return newCollection;
    }catch(error){
        throw new AppError('Cannot create a new collection Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllCollections(data){
    try{
        const allCollections = await collectionRepository.getCollections(data);
        return allCollections;
    }catch(error){
        console.log("error=",error)
        throw new AppError('Cannot find a new collection Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCollectionDetails(query){
    try{
        const collectionDetails = await collectionRepository.getOne(query);
        return collectionDetails;
    }catch(error){
        throw new AppError('Cannot find a new collection Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCollection(data) {
    try {
      const link = await collectionRepository.deleteOne(data);
      return link;
    } catch (error) {
      throw new AppError("Cannot delete this link", StatusCodes.BAD_REQUEST);
    }
  }

  async function updateCollection(id, data) {
    try {
      const updatedCollection = await collectionRepository.UpdateOne(id, data);
      return updatedCollection;
    } catch (error) {
      throw new AppError("Update failed", StatusCodes.NOT_FOUND);
    }
  }

module.exports={
    createCollection,getAllCollections,getCollectionDetails,deleteCollection,updateCollection
}