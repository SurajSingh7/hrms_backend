import eventHandler from "../handlers/event-handler.js";
import RoleActivityConsumer from "../consumers/role-activity-consumer.js";

const RoleManagementEvents = {
    ROLE_CREATED: "role.created",
    ROLE_UPDATED: "role.updated",
    ROLE_DELETED: "role.deleted",

    PERMISSION_CREATED: "permission.created",
    PERMISSION_UPDATED: "permission.updated",
    PERMISSION_DELETED: "permission.deleted",

    MODULE_CREATED:"module.created",
    MODULE_UPDATED: "module.updated",
    MODULE_DELETED: "module.deleted",
    
    DEPARTMENT_CREATED : "department.created",
    DEPARTMENT_UPDATED : "department.updated",
    DEPARTMENT_DELETED : "department.deleted",
};

eventHandler.on('roleManagementActivity', (eventName ,data) => {
    try{
        // match the event name to the above defined events if found send to the role-activity consumer
        if(RoleManagementEvents[eventName]){
            RoleActivityConsumer.roleManagementActivity(RoleManagementEvents[eventName], data);
        }
        else {
            console.log(`Event ${eventName} is not defined yet!`);
        }
    }
    catch (error){
        console.error('Error logging role management activity:', error);
    }
})