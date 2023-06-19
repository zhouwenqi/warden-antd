export default {
    'GET /api/global/config':(req:any,res:any)=>{
        const locale = req.headers.locale    
        const config = locale == 'en-US' ? {
            appName:'Warden backend management system',
            domain:'warden.vip',
            serverUrl:'warden.microwarp.com',
            serverAfter:'https://',
            appDescription:'Where are the magical animals?',
            appIcon:'/image/warden-logo.svg',
            isVerifyCode:true,
            appDisable:false,
            loginFaildLimit:5,
            messageChannel:['Sms','App'],
            safeLevel:60

        } : {
            appName:'沃登后台管理系统',
            domain:'warden.vip',
            serverUrl:'warden.microwarp.com',
            serverAfter:'https://',
            appDescription:'神奇动物在哪里？',
            appIcon:'/image/warden-logo.svg',
            isVerifyCode:true,
            appDisable:false,
            loginFaildLimit:5,
            messageChannel:['Sms','App'],
            safeLevel:60
        }
        res.send(config)
    }
}