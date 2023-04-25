const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn')

const commentsController = require('../controllers/comments');

router.post('/songs/:id/comments', ensureLoggedIn, commentsController.create);

router.delete('/songs/:id/comments', ensureLoggedIn, commentsController.delete);

module.exports = router;