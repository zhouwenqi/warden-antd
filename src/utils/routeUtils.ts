import { IntlShape } from "react-intl"
import { matchAuthority } from "./securityUtils"

/**
 * 路由转菜单
 * 本项目只转换/main下的路由
 * @param routes 路由列表
 * @param isAuth 是否验权
 * @returns 
 */
function getMenuData(routes:any[],intl:IntlShape):IMenuData[]{
    const user = global.currentUser
    let menuItemDatas:IMenuData[]=[]
    if(!routes || routes.length <=0){
        return menuItemDatas
    }
    routes.forEach((item,index)=>{
        let auth:boolean = matchAuthority(item.authoritys,user.authoritys)        
        const mkey = getPathToKey(item.path)
        if(!item.redirect && item.name && auth){
            const menuItemData:IMenuData = {
                name:intl.formatMessage({id:mkey}) || item.name,
                locale:false,
                path:item.path,                
                key:mkey,
                iconName:item.icon
            } 
            global.menuMap[mkey]=menuItemData
            menuItemData.items=getMenuData(item.routes,intl)
            menuItemDatas.push(menuItemData)
        }
    })    
    return menuItemDatas
}


function getPathToKey(path:string){
    return path.replace("/main/","menu.").replaceAll("/",".");
}

function matchPathToKeys(path:string){
    let keys:string[] = []
    const paths = path.split("/")
    if(paths.length <= 1){
        return keys
    }
    if(path.length <= 2){
        return [path]
    }
    let strs = paths[0] + "/" + paths[1]
    for(var i=2;i<paths.length;i++){
        strs += "/"+paths[i]
        keys.push(strs)
    }
    return keys;
}
export {getMenuData,matchPathToKeys,getPathToKey}