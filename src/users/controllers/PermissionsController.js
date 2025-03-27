import Permission from "../models/Permission.js";

// Create a new permission
const createPermission = async (req, res) => {
  const { name, description, resources, access, menuName, department } = req.body;
  try {
    const permission = new Permission({
      name: name,
      description: description,
      resources: resources,
      access: access,
      menuName:menuName,
      department:department
    });
    let data = await permission.save();
    res.status(201).send({
      error: false,
      message: "Permission Created Successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: "Error creating permission",
      details: error.message,
    });
  }
};

// Retrieve permissions with aggregation
const getPermission = async (req, res, next) => {
  try {
    const permission = await Permission.aggregate([
      {
        $group: {
          _id: "$access",
          permissionIds: { $push: "$_id" }, // Accumulate the _id values
          names: { $push: "$name" },
          descriptions: { $push: "$description" },
          resources: { $push: "$resources" },
          menuName: {$push: "$menuName" },
          department:{$push:"$department"}
        }
      },
      {
        $project: {
          _id: 0, // Exclude the original _id field if not needed
          access: "$_id",
          permissionIds: 1, // Include the accumulated _id values
          names: 1,
          descriptions: 1,
          resources: 1,
          menuName:1,
          department:1,
        }
      }
    ]);
    res.status(200).send({ error: false, data: permission });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: "Error retrieving permissions",
      details: error.message,
    });
  }
};

// Update an existing permission
const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { name, description, resources, access,menuName,department } = req.body;
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { name, description, resources, access,menuName,department },
      { new: true, runValidators: true }
    );

    if (!updatedPermission) {
      return res.status(404).send({
        error: true,
        message: "Permission not found",
      });
    }

    res.status(200).send({
      error: false,
      message: "Permission Updated Successfully",
      data: updatedPermission,
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: "Error updating permission",
      details: error.message,
    });
  }
};

export { createPermission, getPermission, updatePermission };
