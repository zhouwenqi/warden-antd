export default {
    'POST /api/logs/sms':(req:any,res:any)=>{
        const local = req.headers.local
        if(req.body.pagination.current > 1){
            res.send(
                {
                    list:local=='en-US' ? 
                    [
                        {id:11,templateSn:'ALISMS020382',mobile:'13622302809',smsType:'verification',smsContent:'You are registering as a member, verification code:203820',appType:'WEB',terminal:'PC',sendTime:'2023/3/26 13:12:37'},
                        {id:12,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'verification',smsContent:'You are registering as a member, verification code:442323',appType:'IOS',terminal:'MOBILE',sendTime:'2023/3/25 14:16:33'},
                        {id:13,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'verification',smsContent:'You are registering as a member, verification code:442336',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 14:12:23'}
                    ] : [
                        {id:11,templateSn:'ALISMS020382',mobile:'13622302809',smsType:'验证码',smsContent:'您正在注册会员,验证码:203820',appType:'WEB',terminal:'PC',sendTime:'2023/3/26 13:12:37'},
                        {id:12,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'验证码',smsContent:'您正在修改密码,验证码:442323',appType:'IOS',terminal:'MOBILE',sendTime:'2023/3/25 14:16:33'},
                        {id:13,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'验证码',smsContent:'您正在注册会员,验证码:442336',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 14:12:23'}
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:13
                    }
                }
            )
        }else{
            res.send(
                {
                    list:local=='en-US' ?
                    [
                        {id:1,templateSn:'ALISMS020382',mobile:'13622302809',smsType:'verification',smsContent:'You are registering as a member, verification code:203820',appType:'WEB',terminal:'PC',sendTime:'2023/3/26 13:12:37'},
                        {id:2,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'verification',smsContent:'You are registering as a member, verification code:442323',appType:'IOS',terminal:'MOBILE',sendTime:'2023/3/25 14:16:33'},
                        {id:3,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'verification',smsContent:'You are registering as a member, verification code:442336',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 14:12:23'},
                        {id:4,templateSn:'ALISMS034234',mobile:'13622302809',smsType:'promotion',smsContent:'You have a coupon to collect, with 4 days left..',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 13:12:37'},
                        {id:5,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'verification',smsContent:'You are registering as a member, verification code:626823',appType:'IOS',terminal:'PC',sendTime:'2023/3/24 12:16:35'},
                        {id:6,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'remind',smsContent:'You are registering as a member, verification code:422742',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 12:10:59'},
                        {id:7,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'verification',smsContent:'You are registering as a member, verification code:672343',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/23 14:12:23'},
                        {id:8,templateSn:'ALISMS034234',mobile:'13622302809',smsType:'promotion',smsContent:'You have a coupon to collect, with 6 days left..',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/23 13:12:37'},
                        {id:9,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'verification',smsContent:'You are registering as a member, verification code:477834',appType:'IOS',terminal:'PC',sendTime:'2023/3/23 12:16:35'},
                        {id:10,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'verification',smsContent:'You are registering as a member, verification code:704563',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/22 12:10:55'},
                    ] : [
                        {id:1,templateSn:'ALISMS020382',mobile:'13622302809',smsType:'验证码',smsContent:'您正在注册会员,验证码:203820',appType:'WEB',terminal:'PC',sendTime:'2023/3/26 13:12:37'},
                        {id:2,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'验证码',smsContent:'您正在修改密码,验证码:442323',appType:'IOS',terminal:'MOBILE',sendTime:'2023/3/25 14:16:33'},
                        {id:3,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'验证码',smsContent:'您正在注册会员,验证码:442336',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 14:12:23'},
                        {id:4,templateSn:'ALISMS034234',mobile:'13622302809',smsType:'推广营销',smsContent:'您有一张优惠券待领取，还有4天..',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 13:12:37'},
                        {id:5,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'验证码',smsContent:'您正在修改密码,验证码:626823',appType:'IOS',terminal:'PC',sendTime:'2023/3/24 12:16:35'},
                        {id:6,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'通知提醒',smsContent:'您正在注册会员,验证码:422742',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/24 12:10:59'},
                        {id:7,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'验证码',smsContent:'您正在注册会员,验证码:672343',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/23 14:12:23'},
                        {id:8,templateSn:'ALISMS034234',mobile:'13622302809',smsType:'推广营销',smsContent:'您有一张优惠券待领取，还有6天..',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/23 13:12:37'},
                        {id:9,templateSn:'ALISMS342452',mobile:'13755437539',smsType:'验证码',smsContent:'您正在修改密码,验证码:477834',appType:'IOS',terminal:'PC',sendTime:'2023/3/23 12:16:35'},
                        {id:10,templateSn:'ALISMS020382',mobile:'15925543492',smsType:'验证码',smsContent:'您正在注册会员,验证码:704563',appType:'ANDROID',terminal:'MOBILE',sendTime:'2023/3/22 12:10:55'},
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:13
                    }
                }
            )
        }
    }
}