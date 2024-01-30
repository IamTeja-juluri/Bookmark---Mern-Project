const CrudRepository  = require('./crud-repository')
const { Collection,User } = require("../models")
const jwt = require("jsonwebtoken")
const {ServerConfig} = require("../config")


class collectionRepository extends CrudRepository{

    constructor(){
        super(Collection)
    }

    async getCollections(data){
        const user = data.user
        let query
        if(user){
           query = { $or : [
                    {userId:user._id},
                    {collectionType:'public'}
                ]
            };
        }
        else if(!user && data.headers?.authorization){
            const token=data.headers.authorization.split(' ')[1]
            if(!token)
                throw new AppError("Unauthorised,please login",StatusCodes.UNAUTHORIZED)
            const decoded = jwt.verify(token,ServerConfig.JWT_SECRET)
            const user = await User.findOne({_id:decoded.id}).select("-password")
            if(!user)
                throw new AppError("User Not found",StatusCodes.UNAUTHORIZED)
            query = {  $or : [ {userId:user._id}, {collectionType:'public'} ] } 
            data.user = user
            data.user.accessToken=token
        }
        else
            query={collectionType:'public'}
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
                        {collectionType:'public'},
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
                    {collectionType:'public'},
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
