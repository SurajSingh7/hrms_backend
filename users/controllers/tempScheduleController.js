import Shift from "../models/Shift.js";
const getAllTempSchedules = async (req, res) => {
  try {
    const tempSchedules = await Shift.find();
    res.status(200).json(tempSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTempSchedule = async (req, res) => {
  const { tempShiftName, dateRange, isEnabled } = req.body;

  const newTempSchedule = new TempSchedule({
    tempShiftName,
    dateRange,
    isEnabled,
  });

  try {
    const savedTempSchedule = await newTempSchedule.save();
    res.status(201).json(savedTempSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTempScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const tempSchedule = await Shift.findById(id);
    if (!tempSchedule) {
      res.status(404).json({ message: 'Temporary Schedule not found' });
      return;
    }
    res.status(200).json(tempSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTempSchedule = async (req, res) => {
  const { id } = req.params;
  const { tempShiftName, dateRange, isEnabled } = req.body;

  try {
    const updatedTempSchedule = await Shift.findByIdAndUpdate(id, {
      tempShiftName,
      dateRange,
      isEnabled,
    }, { new: true });

    if (!updatedTempSchedule) {
      res.status(404).json({ message: 'Temporary Schedule not found' });
      return;
    }

    res.status(200).json(updatedTempSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTempSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTempSchedule = await Shift.findByIdAndDelete(id);
    if (!deletedTempSchedule) {
      res.status(404).json({ message: 'Temporary Schedule not found' });
      return;
    }
    res.status(200).json({ message: 'Temporary Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllTempSchedules,
  createTempSchedule,
  getTempScheduleById,
  updateTempSchedule,
  deleteTempSchedule,
};
