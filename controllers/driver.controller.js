const { Driver } = require('../model/schemas.schema.js');

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDriver = async (req, res) => {
    const driver = new Driver(req.body);
    try {
        const existing = await Driver.findOne({phoneNo: driver.phoneNo});

        if(existing){
            throw new Error ('Driver already exist');
        }
        const newDriver = await driver.save();
        res.status(201).json({message: 'Created driver', 'Driver': newDriver});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDriver = async (req, res) => {
    const dId = req.params.id;
    try {
        const deleteDriver = await Driver.findByIdAndDelete(dId);
        if (!deleteDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.status(204).json({message: 'Driver deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};