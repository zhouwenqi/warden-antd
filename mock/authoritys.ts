export default {
    'POST /api/data/authoritys':(req:any,res:any)=>{
        const locale = req.headers.locale       
        res.send(
            {
                list:locale=='en-US' ?
                [
                    {label:'Query report',value:'query:report',authoriths:[{label:'Monitoring',value:'monitoring'},{label:'Visits',value:'visits'},{label:'Order payment statistics',value:'order:payment:statistics'},{label:'Operation logs',value:'operation:logs'},{label:'Sms logs',value:'sms:logs'}]},
                    {label:'Projects',value:'project:manager',authoriths:[{label:'View project',value:'view:project'},{label:'Create project',value:'create:project'},{label:'Modify project',value:'modify:project'},{label:'Delete project',value:'delete:project'}]},
                    {label:'Orders',value:'order:manager',authoriths:[{label:'Export order',value:'export:order'},{label:'Audit order',value:'audit:order'},{label:'Payment order',value:'payment:order'},{label:'Delete order',value:'delete:order'},{label:'Modify order',value:'modify:order'}]},
                    {label:'Coupon manager',value:'promotion:manager',authoriths:[{label:'Crate coupon batch',value:'add:coupon'},{label:'Modify coupon batch',value:'modify:coupon'},{label:'Delete coupn batch',value:'delete:coupon'},{label:'Publish coupon',value:'publish:coupon'},{label:'Verification coupon',value:'verification:coupon'}]},
                    {label:'Ad manager',value:'ad:manager',authoriths:[{label:'Create adslots',value:'add:adslots'},{label:'Modify adslots',value:'modify:adslots'},{label:'Delete adslots',value:'delete:adslots'},{label:'Create ad',value:'add:ad'},{label:'Modify ad',value:'modify:ad'},{label:'Delete ad',value:'delete:ad'}]},
                    {label:'Basic setup',value:'basic:setup',authoriths:[{label:'Modify profile',value:'modify:profile'},{label:'Change password',value:'modify:password'},{label:'Modify config',value:'modify:config'}]},   
                    {label:'Important setup',value:'important:setup',authoriths:[{label:'Dictionary manager',value:'dictionary:manager'},{label:'Dept manager',value:'dept:manager'},{label:'Post manager',value:'post:manager'}]},  
                    {label:'Users',value:'user:manager',authoriths:[{label:'User list',value:'user:list'},{label:'Add user',value:'user:add'},{label:'Modify user',value:'user:modify'},{label:'Delete user',value:'user:delete'},{label:'Add role',value:'role:add'},{label:'Modify role',value:'role:modify'},{label:'Delete role',value:'role:delete'},{label:'Setup authority',value:'role:authroity'}]}
                    
                ] : [
                    {label:'查询报表',value:'query:report',authoriths:[{label:'监控台',value:'monitoring'},{label:'访问统计',value:'visits'},{label:'订单支付统计',value:'order:payment:statistics'},{label:'操作日志',value:'operation:logs'},{label:'短信日志',value:'sms:logs'}]},
                    {label:'项目管理',value:'project:manager',authoriths:[{label:'查看项目',value:'view:project'},{label:'创建项目',value:'create:project'},{label:'修改项目',value:'modify:project'},{label:'删除项目',value:'delete:project'}]},
                    {label:'订单管理',value:'order:manager',authoriths:[{label:'导出订单',value:'export:order'},{label:'审核订单',value:'audit:order'},{label:'支付订单',value:'payment:order'},{label:'删除订单',value:'delete:order'},{label:'修改订单',value:'modify:order'}]},
                    {label:'优惠券管理',value:'promotion:manager',authoriths:[{label:'添加优惠券批次',value:'add:coupon'},{label:'修改优惠券批次',value:'modify:coupon'},{label:'删除优惠券批次',value:'delete:coupon'},{label:'发行优惠券',value:'publish:coupon'},{label:'优惠券核销',value:'verification:coupon'}]},
                    {label:'广告管理',value:'ad:manager',authoriths:[{label:'添加广告位',value:'add:adslots'},{label:'修改广告位',value:'modify:adslots'},{label:'删除广告位',value:'delete:adslots'},{label:'添加广告',value:'add:ad'},{label:'修改广告',value:'modify:ad'},{label:'删除广告',value:'delete:ad'}]},
                    {label:'基本设置',value:'basic:manager',authoriths:[{label:'修改个人资料',value:'modify:profile'},{label:'修改登录密码',value:'modify:password'},{label:'修改配置',value:'modify:config'}]},   
                    {label:'高级设置',value:'important:manager',authoriths:[{label:'字典资料',value:'dictionary:manager'},{label:'部门资料',value:'dept:manager'},{label:'岗位管理',value:'post:manager'}]},  
                    {label:'用户管理',value:'user:manager',authoriths:[{label:'用户列表',value:'user:list'},{label:'添加用户',value:'user:add'},{label:'修改用户资料',value:'user:modify'},{label:'删除用户',value:'user:delete'},{label:'添加角色',value:'role:add'},{label:'修改角色',value:'role:modify'},{label:'删除角色',value:'role:delete'},{label:'设置权限',value:'role:authroity'}]}
                ]
            }
        )
       
    }
}