export const checkPermission = (user) => {

const hasAccess = user.role.permissions
console.log(hasAccess)
 return hasAccess
  };
  