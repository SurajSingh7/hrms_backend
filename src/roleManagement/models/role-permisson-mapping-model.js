import mongoose from "mongoose";
const { Schema } = mongoose;

const RolePermissionMappingSchema = new Schema({
    role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
    module_id: { type: Schema.Types.ObjectId, ref: 'Module' },
    department_id: { type: Schema.Types.ObjectId, ref: 'Department' },
    permission_id: { type: Schema.Types.ObjectId, ref: 'Permission' }
}, { timestamps: true });

RolePermissionMappingSchema.index({ role_id: 1, permission_id: 1 });

const rolePermissionMappingModel = mongoose.model("role-permission-mapping", RolePermissionMappingSchema);

export default rolePermissionMappingModel;