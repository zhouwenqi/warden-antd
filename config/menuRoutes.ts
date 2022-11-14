/** 
 * 菜单路由
 * 1)本项目将/main下的路由绑定为菜单
 * 2)路由带redirect或name为空的不绑定菜单
 * 控制台路由和菜单一起在这里配置
 */
export default [
    {path:'/main/',redirect:'/main/control'},    
    {path:'/main/control', name:'control', icon: 'ReconciliationOutlined', routes:[
        {path:'/main/control/', redirect:'/main/control/dashboard'},
        {path:'/main/control/dashboard', name:'dashboard', icon: 'DashboardOutlined', routes:[
            {path:'/main/control/dashboard/',redirect:'/main/control/dashboard/workbench'},
            {path:'/main/control/dashboard/workbench',name: 'workbench', component:'@/pages/dashboard/workbench/index'},
            {path:'/main/control/dashboard/www', component:'@/pages/dashboard/workbench/index'},
            {path:'/main/control/dashboard/monitoring', name:'monitoring',component:'@/pages/dashboard/monitoring/index'}
        ]},
        {path:'/main/control/report', name:'report', icon: 'BarChartOutlined',routes:[
            {path:'/main/control/report/',redirect:'/main/control/report/visit'},
            {path:'/main/control/report/visit',name:'visit',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/control/report/order',name:'order',component:'@/pages/dashboard/monitoring/index'},
            {path:'/main/control/report/payment',name:'payment',component:'@/pages/dashboard/monitoring/index'}
        ]},
        {path:'/main/control/logs', name:'logs',icon:'warden_logs', routes:[
            {path:'/main/control/logs/',redirect:'/main/control/logs/operates'},
            {path:'/main/control/logs/operates',name:'operates',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/control/logs/sms',name:'sms',component:'@/pages/dashboard/monitoring/index'}
        ]}
    ]},
    {path:'/main/worker', name:'worker', icon: 'DeploymentUnitOutlined', routes:[
        {path:'/main/worker/', redirect:'/main/worker/order'},
        {path:'/main/worker/order',name: 'order', routes:[
            {path:'/main/worker/order/',redirect:'/main/worker/order/list'},
            {path:'/main/worker/order/list',name:'list',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/worker/order/category',name:'category',component:'@/pages/dashboard/monitoring/index'}
        ]},
        {path:'/main/worker/product', name:'product',routes:[
            {path:'/main/worker/product/',redirect:'/main/worker/product/list'},
            {path:'/main/worker/product/list',name:'list',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/worker/product/category',name:'category',component:'@/pages/dashboard/monitoring/index'}
        ]}
    ]},
    {path:'/main/action', name:'action', icon: 'GiftOutlined', routes:[
        {path:'/main/action/', redirect:'/main/action/coupon'},
        {path:'/main/action/coupon',name: 'coupon',component:'@/pages/dashboard/workbench/index'},
        {path:'/main/action/ad', name:'ad',routes:[
            {path:'/main/action/ad/',redirect:'/main/action/ad/list'},
            {path:'/main/action/ad/list',name:'list',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/action/ad/category',name:'category',component:'@/pages/dashboard/monitoring/index'}
        ]}
    ]},
    {path:'/main/system', name:'system', icon: 'SettingOutlined', routes:[
        {path:'/main/system/message',name:'message', icon:'warden_ring', component:'@/pages/dashboard/workbench/index'},
        {path:'/main/system/', redirect:'/main/system/basic'},
        {path:'/main/system/basic',name: 'basic',icon:'ControlOutlined', routes:[
            {path:'/main/system/basic/',redirect:'/main/system/basic/profile'},
            {path:'/main/system/basic/profile',name:'profile',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/system/basic/config',name:'config',component:'@/pages/dashboard/workbench/index'}
        ]},
        {path:'/main/system/data',name: 'data',icon:'GroupOutlined', routes:[
            {path:'/main/system/data/',redirect:'/main/system/data/dictionary'},
            {path:'/main/system/data/dictionary',name:'dictionary',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/system/data/dept',name:'dept',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/system/data/post',name:'post',component:'@/pages/dashboard/workbench/index'},
        ]},
        {path:'/main/system/important',name: 'important',icon:'BlockOutlined', routes:[
            {path:'/main/system/important/',redirect:'/main/system/important/notice'},
            {path:'/main/system/important/notice',name:'notice',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/system/important/smsTemplate',name:'smsTemplate',component:'@/pages/dashboard/workbench/index'}
        ]},
        {path:'/main/system/security',name: 'security',icon:'TeamOutlined', routes:[
            {path:'/main/system/security/',redirect:'/main/system/security/user'},
            {path:'/main/system/security/user',name:'user',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/system/security/role',name:'role',component:'@/pages/dashboard/workbench/index'},
            {path:'/main/system/security/permission',name:'permission',component:'@/pages/dashboard/workbench/index'}
        ]},
    ]}
]