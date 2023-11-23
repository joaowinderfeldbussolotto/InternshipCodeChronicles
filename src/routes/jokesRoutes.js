const express = require('express');
const jokesController = require('../controllers/jokesController');

const router = express.Router();

router.get('/', jokesController.getJoke);

module.exports = router;
