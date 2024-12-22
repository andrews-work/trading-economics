const express = require('express');
const router = express.Router();

// Import the mainController
const mainController = require('../controllers/main');

// home page
router.get('/', mainController.homePage);

// country pages
router.get('/country/:name', mainController.countryPage);

// comapre page
router.get('/compare', mainController.comparePage);

module.exports = router;
