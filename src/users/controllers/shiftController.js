import Shift from "../models/Shift.js";
const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


let formData = {};
const createShift = async (req, res) => {
    formData.step5 = req.body;
  //   console.log("shift 15",req.body)
  // const { shiftName, fromTime, toTime } = req.body;

  // const newShift = new Shift({
  //    shiftName,
  //  fromTime,
  //    toTime,
  //  });

  // try {
  //   //  const savedShift = await newShift.save();
  //   return res.status(201).json(savedShift);
  // } catch (error) {
  //   return res.status(400).json({ error: error.message });
  //  }

  return res.status(200).send('Step 5 data stored shift');
};

const getShiftById = async (req, res) => {
  const { id } = req.params;

  try {
    const shift = await Shift.findById(id);
    if (!shift) {
      res.status(404).json({ message: 'Shift not found' });
      return;
    }
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateShift = async (req, res) => {
  const { id } = req.params;
  const { shiftName, fromTime, toTime } = req.body;

  try {
    const updatedShift = await Shift.findByIdAndUpdate(id, {
      shiftName,
      fromTime,
      toTime,
    }, { new: true });

    if (!updatedShift) {
      res.status(404).json({ message: 'Shift not found' });
      return;
    }

    res.status(200).json(updatedShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteShift = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedShift = await Shift.findByIdAndDelete(id);
    if (!deletedShift) {
      res.status(404).json({ message: 'Shift not found' });
      return;
    }
    res.status(200).json({ message: 'Shift deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllShifts,
  createShift,
  getShiftById,
  updateShift,
  deleteShift,
};

export const getFormData = () => formData;