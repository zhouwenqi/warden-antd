import { ConfigProvider } from "antd"
import { history, useIntl } from "umi"
import defaultConfig from "../config/defaultConfig"
import {getLocalUser} from "./utils/stringUtils"

/**
 * 运行时配置
 * 请参考：https://umijs.org/docs/api/runtime-config
 * @returns 
 */
export async function getInitialState():Promise<{ 
    config: Warden.IWardenConfig;
    currentUser?:Warden.SysUser; }>{    
    ConfigProvider.config({
        theme:{
            primaryColor:defaultConfig.themeColor
        }
    })
    global.currentUser = await getLocalUser()
    global.isHandFold = false
    global.menuMap={}
    return {
        config: defaultConfig,
        currentUser: global.currentUser
    }
}
export const onRouteChange = ({ location, routes, action }: any) => {
    if(!global.routes){
        global.routes = routes
    }
}