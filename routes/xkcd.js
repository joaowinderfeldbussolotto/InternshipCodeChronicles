const express = require('express');
const router = express.Router();
const xkcdController = require('../controllers/xkcdController');

router.get('/', xkcdController.getIndex);

module.exports = {router};