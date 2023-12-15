import {
  TPermissionAction,
  TPermissionResource,
  TPermissionSchema,
} from "permission";

const permissionResources: TPermissionResource[] = [
  "BANNERS",
  "CATEGORIES",
  "PERMISSIONS",
  "PRODUCTS",
  "SIZES",
  "USERS",
  "DASHBOARD",
  "ORDERS",
  "SETTING",
];
const permissionActions: TPermissionAction[] = [
  "CREATE",
  "DELETE",
  "READ",
  "UPDATE",
];
const permissionsSeedData: TPermissionSchema[] = [];
for (const resource of permissionResources) {
  for (const action of permissionActions) {
    permissionsSeedData.push({
      name: `${resource}_${action}`,
      description: `permission to ${action.toLocaleLowerCase()} ${resource.toLocaleLowerCase()}`,
    });
  }
}
export default permissionsSeedData;
