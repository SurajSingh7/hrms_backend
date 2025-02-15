import Department from "../models/Department.js";

// Create a new department
export const createDepartment = async (req, res) => {
    const { name, roles } = req.body;
    try {
        const department = new Department({ name, roles });
        const data = await department.save();
        res.send({ error: false, message: "Department Created Successfully!", data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "Failed to create department" });
    }
};

// Get all departments
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find({});
        res.send({ error: false, data: departments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "Failed to retrieve departments" });
    }
};

// Get a single department by ID
export const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).send({ error: true, message: "Department not found" });
        }
        res.send({ error: false, data: department });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "Failed to retrieve department" });
    }
};

// Update a department by ID
export const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, roles } = req.body;
    try {
        const department = await Department.findByIdAndUpdate(
            id,
            { name, roles },
            { new: true, runValidators: true }
        );
        if (!department) {
            return res.status(404).send({ error: true, message: "Department not found" });
        }
        res.send({ error: false, message: "Department Updated Successfully!", data: department });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "Failed to update department" });
    }
};

// Delete a department by ID
export const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).send({ error: true, message: "Department not found" });
        }
        res.send({ error: false, message: "Department Deleted Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "Failed to delete department" });
    }
};
