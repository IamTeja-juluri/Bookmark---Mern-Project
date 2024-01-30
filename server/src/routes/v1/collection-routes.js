const express= require('express');
const { CollectionController } = require('../../controllers');
const LinkRoutes = require("./links/link-routes");
const { CollectionMiddlewares,AuthMiddlewares,PaginatedResultsMiddlewares } = require('../../middlewares');
const { upload } = require('../../utils/common/fileUpload');

const router=express.Router();
router.use(express.json());

router.use('/links',LinkRoutes)
router.post('/new',AuthMiddlewares.protect,upload.single("image"),CollectionMiddlewares.validateCreateCollection,CollectionController.createCollection)
router.get('/',CollectionController.getAllCollections)

module.exports=router