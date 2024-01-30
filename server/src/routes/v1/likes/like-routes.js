const express =  require("express")
const { LikeController } = require("../../../controllers")
const router = express.Router()
router.use(express.json())
const {AuthMiddlewares} = require('../../../middlewares')
router.get('/:name',LikeController.getLikesCount)
router.patch('/',AuthMiddlewares.protect,LikeController.updateLikesCount)
module.exports=router;