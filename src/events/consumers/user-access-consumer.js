import changeLogsModel from '../../roleManagement/models/change-logs-model.js';

class UserAccessConsumer {
  static async userAccessActivity(eventName ,{user_name, user_id, ip_address,resource_affected,changes,browser_agent}) {
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

      console.log(' user access changes has been logged in change logs table.');
    } catch (error) {
      console.log('Error logging user access activity :', error);
    }
  }
}

export default UserAccessConsumer;
