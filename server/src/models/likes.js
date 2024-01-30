const mongoose=require('mongoose')

const likeSchema = mongoose.Schema({
    user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    },
    collection : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Collection'
    },
    likeCount : {
        type : Number,
        default : 0
    }
})

const  Like = mongoose.model("Like",likeSchema)
module.exports=Like