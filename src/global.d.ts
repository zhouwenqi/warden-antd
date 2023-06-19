export {};
declare global {
  var routes: any[];
  var menus: IMenuData[];
  var menuMap:Record<string,any>;
  var currentUser:Warden.SysUser;  
  var isHandFold:boolean;
}
