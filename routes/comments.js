const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn')

const commentsController = require('../controllers/comments');

router.post('/songs/:id/comments', ensureLoggedIn, commentsController.create);

router.get('/comments/:id/edit',ensureLoggedIn, commentsController.edit)

router.put('/songs/:id/comments',ensureLoggedIn, commentsController.update)

router.delete('/songs/:id/comments', ensureLoggedIn, commentsController.delete);


module.exports = router;