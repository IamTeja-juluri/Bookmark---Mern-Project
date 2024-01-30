const CrudRepository  = require('./crud-repository')
const { Like } = require('../models')

class likeRepository extends CrudRepository{

    constructor(){
        super(Like)
    }

    async getLikesCount(data){
        
    }

}

module.exports=likeRepository
