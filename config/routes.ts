/**
 * 路由
 */
import menuRoutes from "./menuRoutes"
export default [
    {path:'/',component:'@/pages/index',authorits:["xxxxx"]},
    {path:'/docs',component:'@/pages/docs'},
    {path:'/login',component:'@/pages/login/index',title:'login...'},
    {path:'/main',component:'@/layouts/MainLayout',wrappers:['@/wrappers/auth'],routes:menuRoutes}
]