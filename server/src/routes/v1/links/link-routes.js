const express = require("express");
const { LinkController } = require("../../../controllers");
const router = express.Router();
router.use(express.json());
const {
  PaginatedResultsMiddlewares,
  AuthMiddlewares,
} = require("../../../middlewares");
const { Link } = require("../../../models");
router.post("/new", AuthMiddlewares.protect, LinkController.createLink);
router.get(
  "/find",
  PaginatedResultsMiddlewares.paginatedResults(Link),
  LinkController.getAnyLinksByQuery
);
router.get("/latest", LinkController.getLatestLinks);
router.get("/", LinkController.getLinks);
router.patch("/", AuthMiddlewares.protect, LinkController.updateLink);
router.delete("/", AuthMiddlewares.protect, LinkController.deleteLink);
module.exports = router;
