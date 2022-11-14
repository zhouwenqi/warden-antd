import React from 'react';
import * as AntIcon from '@ant-design/icons';
import AppIcon from '@/components/AppIcon';
import { getPathToKey } from './routeUtils';

/**
 * 获取整个Antd菜单
 * @param menuData 菜单数据
 * @returns 
 */
const getAntdMenus=(menuData:IMenuData[])=>{    
    let antdMenuItemDatas:IAntMenuData[]=[]
    if(menuData == undefined || menuData.length <= 0){
        return undefined
    }
    menuData.forEach((item)=>{
        const menuItemData = getAntdMenuItem(item)
        menuItemData.children = getAntdMenus(item.items!)
        antdMenuItemDatas.push(menuItemData)
    })
    return antdMenuItemDatas
}

/**
 * 获取单个Antd菜单组件
 * @param menuData 单个菜单数据
 * @returns 
 */
const getAntdMenuItem=(menuData:IMenuData) => {    
    const antdMenu:IAntMenuData = {
        label:menuData.name,
        key:menuData.path,
        children:undefined,
        icon:getMenuIcon(menuData),
        theme:'light'
    }
    return antdMenu
}

/**
 * 分隔菜单
 * @param antdMenus 原始菜单
 * @param selectdKeys 菜单选中key值
 * @returns 
 */
const getSplitAntdMenus=(antdMenus?:IAntMenuData[],selectdKeys?:string[])=>{    
    let rootMenus:IAntMenuData[]=[]
    let childMenus:IAntMenuData[]=[]
    antdMenus?.forEach((item)=>{
        if(item.key == selectdKeys![0]){
            childMenus = item.children ? item.children : []
        }
        const menu = item
        menu.children = undefined
        rootMenus.push(menu)
    })    
    
    return {
        rootMenus,childMenus
    }
}

const getMapMenus=(keys:string[])=>{  
  let menus:IMenuData[]=[]
  if(keys && keys.length>0){
    keys.forEach((k)=>{      
      const menu:IMenuData = global.menuMap[getPathToKey(k)]     
      if(menu) {
        menus.push(menu)
      }      
    })
  }
  return menus
}

const getBreadcrumbData=(keys:string[])=>{
  let data:any[]=[]
  if(keys && keys.length>0){
    keys.forEach((k,index)=>{
      const menu:IAntMenuData = global.menuMap[k]
      if(menu){
        data.push({
          label:menu.label,
          key:'breadcrumb'+index
        })
      }
    })
  }
  return data
}

/**
 * 获取菜单图标组件
 * @param item 单个数单数据
 * @returns 
 */
const getMenuIcon=(item:IMenuData)=> {
  const iconArr: string[] = item.iconName ? item.iconName.split('_') : [];
  let iconName: string = '';
  let iconPrefix: IconType = 'ant';
  if (iconArr.length > 1) {
    iconPrefix = iconArr[0] as IconType;
    iconName = iconArr[1];
  } else if (iconArr.length == 1) {
    iconName = iconArr[0];
  }
  let icon: React.ReactNode = undefined;
  if (iconName) {
    switch (iconPrefix) {
      default:
      case 'ant':
        icon = React.createElement(AntIcon && (AntIcon as any)[iconName], {
          style: { fontSize: '16px' },
        });
        break;
      case 'warden':
        icon = (<span className='anticon anticon-setting ant-menu-item-icon'><AppIcon name={iconName} /></span>)
        break;
    }
  }
  return icon
}

export {getAntdMenus,getAntdMenuItem,getSplitAntdMenus,getMapMenus,getBreadcrumbData}