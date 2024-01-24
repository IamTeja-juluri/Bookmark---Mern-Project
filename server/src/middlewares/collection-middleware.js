const { StatusCodes }=require('http-status-codes')
const {ErrorResponse}=require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateCollection(req,res,next){
    if(!req.body.name){
        console.log(req.body)
        ErrorResponse.message='Something went wrong while creating a new collection'
        ErrorResponse.error= new AppError(['collection name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST)
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.collectionType){
        ErrorResponse.message='Something went wrong while creating a new collection'
        ErrorResponse.error= new AppError(['collectionType not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST)
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.description){
        ErrorResponse.message='Something went wrong while creating a new collection'
        ErrorResponse.error= new AppError(['collection description not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST)
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    next()
};

module.exports={
    validateCreateCollection
}