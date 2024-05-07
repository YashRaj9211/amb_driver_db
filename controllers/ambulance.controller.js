// controllers/ambulanceController.js
const { Ambulance } = require('../model/schemas.schema.js');

// Get all ambulances
// exports.getAllAmbulances = async (req, res) => {
//   try {
//     const ambulances = await Ambulance.find();
//     res.json(ambulances);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Create a new ambulance
exports.createAmbulance = async (req, res) => {
  const ambulance = new Ambulance(req.body);
  try {
    const existing = await Ambulance.findOne({vehicleNo: ambulance.vehicleNo});
    if(existing) throw new Error(`Ambulance with ${ambulance.vehicleNo} already exists`);
    const newAmbulance = await ambulance.save();
    res.status(201).json({ message: 'Ambulance created successfully', ambulance: newAmbulance });
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
};

// Update an existing ambulance
exports.updateAmbulance = async (req, res) => {
  const { id } = req.params;
  const { vehicleNo, type, color, hospitalRelated } = req.body;
  try {
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(id, {
      vehicleNo: vehicleNo,
      type: type,
      color: color,
      hospitalRelated: hospitalRelated
    }, { new: true });
    if (!updatedAmbulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }
    res.json(updatedAmbulance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an ambulance
exports.deleteAmbulance = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAmbulance = await Ambulance.findByIdAndDelete(id);
    if (!deletedAmbulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }
    res.json(deletedAmbulance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAmbulanceByVehicleNo = async (req, res) => {
    const  vehicleNo  = req.params.vehicleNo;
    try {
      const ambulance = await Ambulance.findOne({ vehicleNo: vehicleNo });
      if (!ambulance) {
        return res.status(404).json({ message: 'Ambulance not found' });
      }
      res.json(ambulance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
