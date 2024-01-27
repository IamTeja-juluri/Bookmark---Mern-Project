const {StatusCodes}=require('http-status-codes');
const {LinkService, CollectionService }=require('../services');
const {Collection} = require("../models")
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function createLink(req,res){
    try{
        if(!req.user)
            throw new AppError(`Please login to create a bookmark`,StatusCodes.BAD_REQUEST)
        const authorName=req.user.name
        const userId = req.user._id
        const collectionName = req.query.name
        const collection =  await Collection.findOne({name:collectionName})
        const collectionId = collection._id
        const {link,linkName} = req.body       
        const collectionLink = await LinkService.createLink({userId,authorName,link,linkName,collectionId});
        SuccessResponse.data=collectionLink;
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

async function getCollectionLinks(req,res){
    try{
        const collection = await Collection.findOne({name:req.query.collectionName})
        const links = await LinkService.getLinks({collectionId:collection._id})
        SuccessResponse.data = links
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

async function getLatestLinks(req,res){

    try{
        const links = await LinkService.getLinks(req.query)
        SuccessResponse.data = links
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

async function getAnyLinksByQuery(req,res){
    try{
        return res
                  .status(StatusCodes.OK)
                  .json(res.paginatedResults)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

async function updateLink(req,res){
    try{
        const link = await LinkService.getLinks(req.query)
        const newLink = {...link , ...req.body};
        if(link.userId !== req.user._id)
            throw new Error("You are not authorised to perform this action",StatusCodes.UNAUTHORIZED)
        await newLink.save()
        SuccessResponse.data = "Link Updated Successfully"
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

module.exports={createLink,getCollectionLinks,getAnyLinksByQuery,getLatestLinks,updateLink}