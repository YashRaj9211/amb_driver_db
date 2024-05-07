const { Patient } = require('../model/schemas.schema.js')

exports.getAllUser = async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.newUser = async (req, res) => {
    const user = new Patient(req.body);

    try {
        const existing = await Patient.findOne({ phoneNo: user.phoneNo });
        if (existing) {
            throw new Error(`User ${user.name} already exists`);
        }
        const newUser = await newUser.save();
        res.status(200).json({ message: 'User Created' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const uid = req.params.uid
    const patient = req.body;

    try {
        const existing = await Patient.findById(uid);
        if (!existing) {
            throw new Error(`User ${uid} donot exists`);
        }

        const updateUser = await Patient.findByIdAndUpdate(uid, patient, { new: true });
        if (!updateUser) {
            throw new Error(`User ${uid} unable to update`);
        }

        res.status(200).json({ message: 'User Updated' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.delteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            throw new Error(`Patient ${id} unable to delete`);
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.userById = async (req, res) => {
    const uid = res.para.id;

    try {
        const user = await User.findById(uid);
        if(!user) throw new Error(`User ${uid} not found`);
        return res.status(200).json({ body: user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Update emergency contacts for a patient
exports.updateEmergencyContacts = async (req, res) => {
  const { id } = req.params;
  const { emergencyContacts } = req.body;
  try {
    const user = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    user.emergencyContacts.push(...emergencyContacts);
    const updatedPatient = await patient.save();
    res.json({ message: 'Emergency contacts updated successfully', patient: updatedPatient });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
