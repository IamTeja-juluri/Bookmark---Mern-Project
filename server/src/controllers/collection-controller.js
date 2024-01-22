const {StatusCodes}=require('http-status-codes');
const { CollectionService }=require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function createCollection(req,res){
    try{
        const authorName=req.user.name
        const userId = req.user._id
        const {name,description,collectionType} = req.body
        const newCollection = await CollectionService.createCollection({
                                userId,authorName,name,description,collectionType
                             });
        SuccessResponse.data=newCollection;
       return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse);  
    }
}

async function getAllCollections(req,res){

    try{
        const allCollections=await CollectionService.getAllCollections(req);
        return res
                  .status(StatusCodes.OK)
                  .json(allCollections);
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

async function searchCollections(req,res){
    try{
        const collectionResults=await CollectionService.searchCollections(req);
        return res
                  .status(StatusCodes.OK)
                  .json(collectionResults);
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

module.exports={
    createCollection,getAllCollections,searchCollections
}