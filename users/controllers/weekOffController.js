import Shift from "../models/Shift.js";
const getAllWeekOffs = async (req, res) => {
  try {
    const weekOffs = await Shift.find();
    res.status(200).json(weekOffs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createWeekOff = async (req, res) => {
  const { day, isWeekOff, isHalfDay } = req.body;

  const newWeekOff = new WeekOff({
    day,
    isWeekOff,
    isHalfDay,
  });

  try {
    const savedWeekOff = await newWeekOff.save();
    res.status(201).json(savedWeekOff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWeekOffById = async (req, res) => {
  const { id } = req.params;

  try {
    const weekOff = await Shift.findById(id);
    if (!weekOff) {
      res.status(404).json({ message: 'Week Off not found' });
      return;
    }
    res.status(200).json(weekOff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWeekOff = async (req, res) => {
  const { id } = req.params;
  const { day, isWeekOff, isHalfDay } = req.body;

  try {
    const updatedWeekOff = await Shift.findByIdAndUpdate(id, {
      day,
      isWeekOff,
      isHalfDay,
    }, { new: true });

    if (!updatedWeekOff) {
      res.status(404).json({ message: 'Week Off not found' });
      return;
    }

    res.status(200).json(updatedWeekOff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWeekOff = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWeekOff = await Shift.findByIdAndDelete(id);
    if (!deletedWeekOff) {
      res.status(404).json({ message: 'Week Off not found' });
      return;
    }
    res.status(200).json({ message: 'Week Off deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllWeekOffs,
  createWeekOff,
  getWeekOffById,
  updateWeekOff,
  deleteWeekOff,
};
