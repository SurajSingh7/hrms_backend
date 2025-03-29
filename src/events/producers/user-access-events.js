import eventHandler from "../handlers/event-handler.js";
import UserAccessConsumer from "../consumers/user-access-consumer.js";

const UserAccessEvents = {
    USER_ROLE_ASSIGNED: "user.role.assigned",
    USER_ROLE_REMOVED: "user.role.removed",
    USER_PERMISSION_ASSIGNED: "user.permission.assigned",
    USER_PERMISSION_REVOKED: "user.permission.revoked",
};

eventHandler.on('userAccessActivity', (eventName ,data) => {
    try{
        // match the event name to the above defined events if found send to the role-activity consumer
        if(UserAccessEvents[eventName]){
            UserAccessConsumer.userAccessActivity(UserAccessEvents[eventName], data);
        }
        else {
            console.log(`Event ${eventName} is not defined yet!`);
        }
    }
    catch (error){
        console.error('Error logging user access activity:', error);
    }
})