const CrudRepository  = require('./crud-repository')
const {User} = require("../models")
const jwt = require("jsonwebtoken")
const AppError = require('../utils/errors/app-error')

class userRepository extends CrudRepository{

    constructor(){
        super(User)
    }

    async getUserDetailsFromToken(token){
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({_id:verified.id}).select('-password -createdAt -updatedAt -__v')
        if(!user)
            throw new AppError("Not able to find resource",StatusCodes.NOT_FOUND);
        return user
    }

}

module.exports=userRepository
