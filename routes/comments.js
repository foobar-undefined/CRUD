const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

router.post('/songs/:id/comments', commentsController.create);

router.delete('/comments', commentsController.delete);

module.exports = router;