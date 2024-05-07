const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver.controller.js');

router.get('/drivers', driverController.getAllDrivers);
router.post('/', driverController.createDriver);
router.delete('/:id', driverController.deleteDriver);
// Define other routes for updating, deleting drivers, etc.

module.exports = router;
