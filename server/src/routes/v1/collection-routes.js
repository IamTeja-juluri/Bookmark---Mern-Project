const express = require("express");
const { CollectionController } = require("../../controllers");
const LinkRoutes = require("./links/link-routes");
const LikeRoutes = require("./likes/like-routes");
const { CollectionMiddlewares, AuthMiddlewares } = require("../../middlewares");
const { upload } = require("../../utils/common/fileUpload");
const router = express.Router();
router.use(express.json());
router.use("/likes", LikeRoutes);
router.use("/links", LinkRoutes);
router.post(
  "/new",
  AuthMiddlewares.protect,
  upload.single("image"),
  CollectionMiddlewares.validateCreateCollection,
  CollectionController.createCollection
);
router.get("/", CollectionController.getAllCollections);
router.patch("/",AuthMiddlewares.protect,CollectionController.updateCollection)
router.delete("/",AuthMiddlewares.protect,CollectionController.deleteCollection)
module.exports = router;
