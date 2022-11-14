import { ConfigProvider } from "antd"
import defaultConfig from "../config/defaultConfig"

export async function getInitialState():Promise<{ config: Warden.IWardenConfig }>{

    ConfigProvider.config({
        theme:{
            primaryColor:defaultConfig.themeColor
        }
    })

    global.currentUser = {
        id:15,
        nickName:'zhouwenqi',
        deptName: '研发部',
        deptId: 25,
        postName: '前端工程师',
        postId: 14,
        createDate: new Date(),
        loginDate: new Date(),
        face:'xxx.png',
        authoritys: ['xxx','ppp'],
        roles: ['manager','dev'],
        isRoot:false
    }    
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
    console.log(global.menuMap)
}