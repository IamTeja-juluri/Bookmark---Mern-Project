const CrudRepository  = require('./crud-repository')
const { Link } = require("../models")

class linkRepository extends CrudRepository{

    constructor(){
        super(Link)
    }

   async getLatestLinks(query){
    // Sort in descending order based on the timestamp
      const latestRecords = await Link.find(query)
                                                .sort({createdAt:-1})
                                                .limit(5)
      return latestRecords;
   }

}

module.exports=linkRepository
