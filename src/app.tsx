import { ConfigProvider } from "antd"
import defaultConfig from "../config/defaultConfig"
import {getLocalUser} from "./utils/stringUtils"
export async function getInitialState():Promise<{ config: Warden.IWardenConfig }>{
    
    ConfigProvider.config({
        theme:{
            primaryColor:defaultConfig.themeColor
        }
    })

    /** 模拟获取用户数据 */
    global.currentUser = getLocalUser()
    global.isHandFold = false
    global.menuMap={}
    return {
        config: defaultConfig,
    }  
}
export const onRouteChange = ({ location, routes, action }: any) => {
    if(!global.routes){
        global.routes = routes
    }
}