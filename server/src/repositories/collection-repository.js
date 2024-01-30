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
        const results = await Collection.find(query).sort({ createdAt: -1 })
        return results;
    }
    
    async searchCollections(data){
        const user = data.user
        let query
        if(user){
            query = {
                "$and":{
                    "$or":[
                        {collectionType:'Public'},
                        {userId:user._id}
                    ],
                    "$or": [
                        { name: { $regex: data.params.key, $options: 'i' } },
                        { description: { $regex: data.params.key, $options: 'i' } }
                    ]
                }
            }
        }else{
            query = {
                "$and":[
                    {collectionType:'Public'},
                    {
                        "$or": [
                            { name: { $regex: data.params.key, $options: 'i' } },
                            { description: { $regex: data.params.key, $options: 'i' } }
                        ]
                    }
                ]
            }
        }
        const results =await Collection.find(query);
        return results;
    }


}

module.exports=collectionRepository
