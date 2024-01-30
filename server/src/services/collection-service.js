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


module.exports={
    createCollection,getAllCollections,getCollectionDetails
}