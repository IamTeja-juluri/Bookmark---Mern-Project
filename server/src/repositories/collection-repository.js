const CrudRepository  = require('./crud-repository')
const ObjectId = require('mongodb').ObjectId
const { Collection } = require("../models")
const UserRepository  = require('./user-repository')
const AppError = require('../utils/errors/app-error')
const { StatusCodes } = require('http-status-codes')
const userRepository = new UserRepository()

class collectionRepository extends CrudRepository{

    constructor(){
        super(Collection)
    }

    async getCollections(data){
        let query
        if(data.headers?.authorization){
            const token=data.headers.authorization.split(' ')[1]
            if(!token)
                throw new AppError("Unauthorised,please login",StatusCodes.UNAUTHORIZED)
            const user = await userRepository.getUserDetailsFromToken(token)
            if(!user)
                throw new AppError("User Not found",StatusCodes.UNAUTHORIZED)
            const  userObjectId = new ObjectId(user._id)
            query = {$or:[{userId:userObjectId},{collectionType:'Public'}]} 
        }
        else
            query={collectionType:'Public'}
        const results = await Collection.find(query).sort({ createdAt: -1 }).populate('likes').exec()
        return results;
    }

}

module.exports=collectionRepository
