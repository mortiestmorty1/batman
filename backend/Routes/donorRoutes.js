const express = require('express');
const router = express.Router();

const donorController = require('../Controller/donorController');

// Donor routes
router.post('/', donorController.createDonor);

module.exports = router;
