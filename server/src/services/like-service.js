const {LikeRepository} = require("../repositories")
const {StatusCodes}=require('http-status-codes')
const AppError = require('../utils/errors/app-error')
const likeRepository = new LikeRepository()


async function getLikesCount(data){
    try{
        const likes = await likeRepository.getLikesCount(data)
        return likes
    }catch(error){
        throw new AppError('Unable to get like count',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateLikeCount(query){
    try{
        const likes = await likeRepository.update(query)
        return likes
    }catch(error){
        throw new AppError('Unable to update like count',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports={
    getLikesCount,updateLikeCount
}