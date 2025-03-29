import changeLogsModel from '../../roleManagement/models/change-logs-model.js';

class RoleActivityConsumer {
  static async roleManagementActivity(eventName ,{user_name, user_id, ip_address,resource_affected,changes,browser_agent}) {
    try {
      await changeLogsModel.create({
        user_name,
        user_id,
        ip_address,
        resource_affected,
        changes,
        browser_agent,
        action : eventName
      });

      console.log(' Changes logged in change logs table.');
    } catch (error) {
      console.log('Error logging role managennt activity :', error);
    }
  }
}

export default RoleActivityConsumer;
