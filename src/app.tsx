import { ConfigProvider } from "antd"

export async function getInitialState(){
    ConfigProvider.config({
        theme:{
            primaryColor:'#ff6600'
        }
    })
}
export const onRouteChange = ({ location, routes, action }: any) => {
    if(!global.routes){
        global.routes = routes
    }
    console.log(global.routes)
}