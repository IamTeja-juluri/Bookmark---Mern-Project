const express =  require("express");
const { BookMarkController } = require("../../../controllers");
const router = express.Router();
router.use(express.json());
const {PaginatedResultsMiddlewares,AuthMiddlewares} = require('../../../middlewares');
const { BookMark } = require("../../../models");
router.post('/new',AuthMiddlewares.protect,BookMarkController.createBookMark)
router.get('/find',PaginatedResultsMiddlewares.paginatedResults(BookMark),BookMarkController.getAnyBookmarksByQuery)
router.get('/latest',BookMarkController.getLatestBookmarks)
router.patch('/',AuthMiddlewares.protect,BookMarkController.updateBookmark)
module.exports=router;