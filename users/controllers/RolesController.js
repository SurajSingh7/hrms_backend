import Role from "../models/Role.js";

// Create a new role
const createRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const role = new Role({
      name: name,
      permissions: permissions,
    });

    const data = await role.save();
    res
      .status(201)
      .send({ error: false, message: "Role Created Successfully", data: data });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: "Error creating role",
      details: error.message,
    });
  }
};

// Retrieve roles with populated permissions
const getRole = async (req, res) => {
  try {
    let data = await Role.find({}).populate("permissions");

    res.status(200).send({ error: false, data: data });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: "Error fetching roles",
      details: error.message,
    });
  }
};

// Update an existing role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true, runValidators: true }
    ).populate("permissions");

    if (!updatedRole) {
      return res.status(404).send({
        error: true,
        message: "Role not found",
      });
    }

    res.status(200).send({
      error: false,
      message: "Role Updated Successfully",
      data: updatedRole,
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: "Error updating role",
      details: error.message,
    });
  }
};

export { createRole, getRole, updateRole };
