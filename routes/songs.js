const express = require("express");
const router = express.Router();
const songController = require("../controllers/songs");
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get("/", songController.index);

router.get("/new", ensureLoggedIn, songController.new);

router.post("/", ensureLoggedIn, songController.create);

router.get("/:id", songController.show);

module.exports = router;