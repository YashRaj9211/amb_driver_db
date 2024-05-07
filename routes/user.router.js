// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// GET all patients
router.get('/', userController.getAllUser);

// POST a new patient
router.post('/', userController.newUser);

// PUT update an existing patient
router.put('/:id', userController.updateUser);

// DELETE a patient
router.delete('/:id', userController.delteUser);


router.put('/:id/emergencyContacts', userController.updateEmergencyContacts);

module.exports = router;
