import { getMenuData } from "@/utils/routeUtils"
import { Outlet,useIntl } from "umi"
import menuRoutes from "../../config/menuRoutes"

export default ()=>{
    console.log("auth...")
    const intl = useIntl()
    if(!global.menus || global.menus.length<=0){
        global.menus = getMenuData(menuRoutes, intl)
    }    
    return <Outlet />
}