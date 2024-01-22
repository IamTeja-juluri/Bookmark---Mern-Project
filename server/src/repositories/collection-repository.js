const CrudRepository  = require('./crud-repository')
const { Collection } = require("../models")

class collectionRepository extends CrudRepository{

    constructor(){
        super(Collection)
    }

    async getCollections(data){
        const user = data.user
        let query
        if(user)
           query = { $or : [
                    {userId:user._id},
                    {collectionType:'public'}
                ]
            };
        else{
            console.log("else")
            query={collectionType:'public'}
        }
        const results = await Collection.find(query);
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
