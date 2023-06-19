import { getMenuData } from "@/utils/routeUtils"
import { Outlet,useIntl,useModel } from "umi"
import menuRoutes from "../../config/menuRoutes"

export default ()=>{
    const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
    console.log("auth...")
    const intl = useIntl()
    if(initialState?.currentUser){
        global.currentUser = initialState?.currentUser
    }
    if(!global.menus || global.menus.length<=0){
        global.menus = getMenuData(menuRoutes, intl)
    }    
    return <Outlet />
}