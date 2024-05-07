const mongoose = require('mongoose');

// Define schema for Driver
const driverSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: Date,
    phoneNo: String,
    address: String,
    licenseNo: String
});


// Define schema for Trip
const tripSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    ambulance: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' },
    startTime: Date,
    endTime: Date,
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
});

// Define schema for Patient
const emergencyContactSchema = new mongoose.Schema({
    name: String,
    relation: String,
    phoneNo: String
});

const patientSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    dob: Date,
    phoneNo: String,
    emergencyContacts: [emergencyContactSchema],
    address: String
});

const ambulanceSchema = new mongoose.Schema({
    vehicleNo: {
        type: String,
        required: true,
        unique: true
    },
    hospitalRelated: {
        type: String,
    }
});
// ambulanceSchema.index({ vehicleNo: 1 });

// Define models
const Driver = mongoose.model('Driver', driverSchema);
const Ambulance = mongoose.model('Ambulance', ambulanceSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Driver, Ambulance, Trip, Patient };
