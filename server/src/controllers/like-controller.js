const {StatusCodes}=require('http-status-codes');
const { LikeService }=require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function updateLikesCount(req,res){
    try{
        const authorName=req.user.name
        const userId = req.user._id
        const {name,description,collectionType} = req.body
        const newCollection = await CollectionService.createCollection({
            userId,authorName,name,description,collectionType,image:fileData
            });
            SuccessResponse.data=newCollection
            return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

async function getLikesCount(req,res){
    try{
        const likes = await LikeService.getLikesCount(req.query)
        SuccessResponse.data = likes.likeCount
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.StatusCode)
                  .json(ErrorResponse)

    }
}


module.exports={
    updateLikesCount,getLikesCount
}