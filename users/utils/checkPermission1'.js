export const checkPermission = (user) => {
    // if (!user || !user.data.role || !user.data) {
    //   return false;
    // }
//    const hasAccess = user.data.role.permissions.some(
//       (permission) => permission.resources === resource
  
//    )
const hasAccess = user.role.permissions
console.log(hasAccess)
 return hasAccess
  };
  
  
  