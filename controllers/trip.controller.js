const { Trip } = require('../model/schemas.schema.js');

exports.addNewTrip = async (req, res) => {
    const trip = new Trip(req.body);
    try {
        const newTrip = await trip.save();
        res.status(200).json({ message: 'You are ready to go!', data: newTrip });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an existing trip
exports.updateTrip = async (req, res) => {
    const { id } = req.params.tid;
    const { ambulanceId, driverId, startTime, endTime, patientId, pickupLocation, dropoffLocation, fare, tripStatus } = req.body;
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(id, {
            ambulanceId: ambulanceId,
            driverId: driverId,
            startTime: startTime,
            endTime: endTime,
            patientId: patientId,
            pickupLocation: pickupLocation,
            dropoffLocation: dropoffLocation,
            fare: fare,
            tripStatus: tripStatus
        }, { new: true });
        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json(updatedTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTripById = async(req, res)=>{
    const {tripId} = req.params.tid;
    try {
        const existing  = await Trip.findById(tripId);
        if(!existing) throw new Error (`Trip ${id} not found`);

        return res.status(200).json({ message: existing});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.getTripsByPatientId = async (req, res) => {
    const patientId = req.params.pid;
    try {
      const trips = await Trip.find({ patientId: patientId });
      
      if(!trips)throw new Error (`No trip found with for ${id}`)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getTripsByDriverId = async (req, res) => {
    const { driverId } = req.params.did;
    try {
      const trips = await Trip.find({ driverId: driverId });
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };