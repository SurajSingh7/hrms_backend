import Shift from "../models/Shift.js";

const getAllEmployeeEnrollMappings = async (req, res) => {
  try {
    const employeeEnrollMappings = await Shift.find();
    res.status(200).json(employeeEnrollMappings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEmployeeEnrollMapping = async (req, res) => {
  const { delhiOffice, tdiLocation, sonipat, opJindal, omax, metroView, gispl } = req.body;

  const newEmployeeEnrollMapping = new Shift({
    delhiOffice,
    tdiLocation,
    sonipat,
    opJindal,
    omax,
    metroView,
    gispl,
  });

  try {
    const savedEmployeeEnrollMapping = await newEmployeeEnrollMapping.save();
    res.status(201).json(savedEmployeeEnrollMapping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEmployeeEnrollMappingById = async (req, res) => {
  const { id } = req.params;

  try {
    const employeeEnrollMapping = await Shift.findById(id);
    if (!employeeEnrollMapping) {
      res.status(404).json({ message: 'Employee Enroll Mapping not found' });
      return;
    }
    res.status(200).json(employeeEnrollMapping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployeeEnrollMapping = async (req, res) => {
  const { id } = req.params;
  const { delhiOffice, tdiLocation, sonipat, opJindal, omax, metroView, gispl } = req.body;

  try {
    const updatedEmployeeEnrollMapping = await Shift.findByIdAndUpdate(id, {
      delhiOffice,
      tdiLocation,
      sonipat,
      opJindal,
      omax,
      metroView,
      gispl,
    }, { new: true });

    if (!updatedEmployeeEnrollMapping) {
      res.status(404).json({ message: 'Employee Enroll Mapping not found' });
      return;
    }

    res.status(200).json(updatedEmployeeEnrollMapping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployeeEnrollMapping = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployeeEnrollMapping = await Shift.findByIdAndDelete(id);
    if (!deletedEmployeeEnrollMapping) {
      res.status(404).json({ message: 'Employee Enroll Mapping not found' });
      return;
    }
    res.status(200).json({ message: 'Employee Enroll Mapping deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllEmployeeEnrollMappings,
  createEmployeeEnrollMapping,
  getEmployeeEnrollMappingById,
  updateEmployeeEnrollMapping,
  deleteEmployeeEnrollMapping,
};
