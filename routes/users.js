const express = require('express');
const router = express.Router();

const userController = reqiure('../controllers/users');

router.get('/new', userController.new );

router.post('/', userController.create);