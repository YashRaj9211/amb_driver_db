// routes/ambulanceRoutes.js
const express = require('express');
const router = express.Router();
const ambulanceController = require('../controllers/ambulance.controller.js');

// GET all ambulances
// router.get('/ambulances', ambulanceController.getAllAmbulances);

// GET ambulance by vehicle number
router.get('/:vehicleNo', ambulanceController.getAmbulanceByVehicleNo);

// POST a new ambulance
router.post('/', ambulanceController.createAmbulance);

// PUT update an existing ambulance
router.put('/:id', ambulanceController.updateAmbulance);

// DELETE an ambulance
router.delete('/:id', ambulanceController.deleteAmbulance);

module.exports = router;
