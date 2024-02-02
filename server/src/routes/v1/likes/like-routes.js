const express = require("express");
const { LikeController } = require("../../../controllers");
const router = express.Router();
router.use(express.json());
const { AuthMiddlewares } = require("../../../middlewares");
router.post(
  "/:collectionId",
  AuthMiddlewares.protect,
  LikeController.toggleLike
);
router.get("/:collectionId", LikeController.getLikesCount);

module.exports = router;
