import mongoose from "mongoose";
const {Schema} = mongoose;

const ModulePermissionMappingSchema = new Schema({
    module_id: {type: Schema.Types.ObjectId, ref: 'Module'},
    permission_id: {type: Schema.Types.ObjectId, ref: 'Permission'},
}, {timestamps : true});

ModulePermissionMappingSchema.index({ module_id: 1, permission_id: 1 });

const modulePermissonMappingModel = mongoose.model("module-permission-mapping", ModulePermissionMappingSchema);

export default modulePermissonMappingModel;