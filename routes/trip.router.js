// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller.js');

// GET all trips
// router.get('/trips', tripController.getAllTrips);

// POST a new trip
router.post('/trips', tripController.addNewTrip);

// PUT update an existing trip
router.put('/:tid', tripController.updateTrip);

// DELETE a trip
// router.delete('/:id', tripController.deleteTrip);

//GET trip by trip id
router.get('/:tid', tripController.getTripById);

// GET trips by patient ID
router.get('/:pid', tripController.getTripsByPatientId);

// GET trips by driver ID
router.get('/did', tripController.getTripsByDriverId);

module.exports = router;
