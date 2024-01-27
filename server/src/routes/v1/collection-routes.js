const express= require('express');
const { CollectionController } = require('../../controllers');
const LinkRoutes = require("./links/link-routes");
const { Collection } = require('../../models');
const { CollectionMiddlewares,AuthMiddlewares,PaginatedResultsMiddlewares } = require('../../middlewares');
const { upload } = require('../../utils/common/fileUpload');

const router=express.Router();
router.use(express.json());

router.use('/links',LinkRoutes)
router.post('/new',AuthMiddlewares.protect,upload.single("image"),CollectionMiddlewares.validateCreateCollection,CollectionController.createCollection)
router.get('/',AuthMiddlewares.protect,PaginatedResultsMiddlewares.paginatedResults(Collection),CollectionController.getAllCollections)
router.get('/search/:key',CollectionController.searchCollections)

module.exports=router