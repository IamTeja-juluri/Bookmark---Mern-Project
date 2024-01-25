const express= require('express');
const { CategoryController } = require('../../controllers');
const { CategoryMiddlewares,PaginatedResultsMiddlewares,AuthMiddlewares } = require('../../middlewares');
const { Category } = require('../../models');
const router=express.Router();
router.use(express.json());
router.post('/new',AuthMiddlewares.protect,CategoryMiddlewares.validateCreateCategory,CategoryController.createCategory)
router.get('/',PaginatedResultsMiddlewares.paginatedResults(Category),CategoryController.getAllCategories)
router.get('/search/:key',CategoryController.searchCategories)
module.exports=router