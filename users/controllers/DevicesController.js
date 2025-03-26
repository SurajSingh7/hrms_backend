import express from 'express';
import Device from '../models/Devices.js'; // Ensure correct path to your model

const router = express.Router();

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new device
router.post('/', async (req, res) => {
  const { deviceName, senderPhone, status } = req.body;

  const device = new Device({
    deviceName,
    senderPhone,
    status,
  });

  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a device
router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json({ message: 'Device deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
