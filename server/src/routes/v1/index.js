const express= require('express');
const { InfoController }=require('../../controllers')
const UserRoutes = require("./user-routes")
const CategoryRoutes = require("./category-routes")
const CollectionRoutes = require("./collection-routes")
const router=express.Router();
router.use(express.json());
router.get('/info',InfoController.info)
router.use('/user',UserRoutes)
router.use('/category',CategoryRoutes)
router.use('/collection',CollectionRoutes)
module.exports=router