const express = require("express");
const router = express.Router();
const songController = require("../controllers/songs");

router.get("/", songController.index);

router.get("/new", songController.new);

router.post("/", songController.create);

router.get("/:id", songController.show);

module.exports = router;