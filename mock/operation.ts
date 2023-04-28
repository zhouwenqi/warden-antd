export default {
    'POST /api/logs/operation':(req:any,res:any)=>{
        const local = req.headers.local
        if(req.body.pagination.current > 1){
            res.send(
                {
                    list:local=='en-US' ? 
                    [
                        {id:11,name:'Oracle',face:'/images/face/f5.png',ip:'89.22.43.154',action:'LOGIN',content:'Oracle use cell phone login warden system',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 18:39:56',modifyDate:'2023/3/25 18:39:56'},
                        {id:12,name:'Oracle',face:'/images/face/f5.png',ip:'189.23.176.179',action:'LOGIN',content:'Oracle use cell phone login warden system',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 19:24:32',modifyDate:'2023/3/25 19:24:32'},
                    ] : [
                        {id:11,name:'Oracle',face:'/images/face/f5.png',ip:'89.22.43.154',action:'LOGIN',content:'Oracle使用手机端APP登录沃登后台管理系统',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 18:39:56',modifyDate:'2023/3/25 18:39:56'},
                        {id:12,name:'Oracle',face:'/images/face/f5.png',ip:'189.23.176.179',action:'LOGIN',content:'Oracle使用手机端APP登录沃登后台管理系统',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 19:24:32',modifyDate:'2023/3/25 19:24:32'},
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:12
                    }
                }
            )
        }else{
            res.send(
                {
                    list:local=='en-US' ?
                    [
                        {id:1,name:'Microsoft',face:'/images/face/f1.png',ip:'142.12.48.109',action:'DELETE',content:'Microsoft delete an order：PSN49837246',appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},               
                        {id:2,name:'Google',face:'/images/face/f2.png',ip:'162.59.218.35',action:'MODIFY',content:'Google modify user(173****234) the password',appType:'OTHER',terminal:'PC',createDate:'2023/3/25 13:22:27',modifyDate:'2023/3/25 13:22:27'},
                        {id:3,name:'Facebook',face:'/images/face/f3.png',ip:'177.43.122.156',action:'LOGIN',content:'Facebook use cell phone login warden system',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 13:24:47',modifyDate:'2023/3/25 13:24:47'},
                        {id:4,name:'Sumsang',face:'/images/face/f4.png',ip:'212.32.33.143',action:'PUBLISH',content:'Sumsang publish product info the warden intelligent UAVs',appType:'ANDROID',terminal:'MOBILE',createDate:'2023/3/25 14:33:53',modifyDate:'2023/3/25 14:33:53'},
                        {id:5,name:'Oracle',face:'/images/face/f5.png',ip:'25.212.35.33',action:'JOIN',content:'Oracle join product the PM fly up',appType:'WEIXIN',terminal:'MAC',createDate:'2023/3/25 15:17:28',modifyDate:'2023/3/25 15:17:28'},
                        {id:6,name:'Microsoft',face:'/images/face/f1.png',ip:'142.12.48.109',action:'DELETE',content:'Microsoft delete an order：PSN49837246',appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},               
                        {id:7,name:'Microsoft',face:'/images/face/f1.png',ip:'153.154.33.43',action:'MODIFY',content:'Microsoft modify user(173****234) the password',appType:'OTHER',terminal:'PC',createDate:'2023/3/25 13:22:27',modifyDate:'2023/3/25 13:22:27'},
                        {id:8,name:'Sumsang',face:'/images/face/f4.png',ip:'188.156.212.39',action:'LOGIN',content:'Sumsang use cell phone login warden system',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 13:24:47',modifyDate:'2023/3/25 13:24:47'},
                        {id:9,name:'Sumsang',face:'/images/face/f4.png',ip:'224.38.166.79',action:'PUBLISH',content:'Sumsang  publish product info the warden intelligent UAVs',appType:'ANDROID',terminal:'MOBILE',createDate:'2023/3/25 14:33:53',modifyDate:'2023/3/25 14:33:53'},
                        {id:10,name:'Google',face:'/images/face/f2.png',ip:'132.58.216.44',action:'JOIN',content:'Google  join product the PM fly up',appType:'WEIXIN',terminal:'MAC',createDate:'2023/3/25 15:17:28',modifyDate:'2023/3/25 15:17:28'},
                    ] : [
                        {id:1,name:'Microsoft',face:'/images/face/f1.png',ip:'142.12.48.109',action:'DELETE',content:'Microsoft删除了订单： PSN49837246',appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},               
                        {id:2,name:'Google',face:'/images/face/f2.png',ip:'162.59.218.35',action:'MODIFY',content:'Google修改了用户(173****234)的登录密码',appType:'OTHER',terminal:'PC',createDate:'2023/3/25 13:22:27',modifyDate:'2023/3/25 13:22:27'},
                        {id:3,name:'Facebook',face:'/images/face/f3.png',ip:'177.43.122.156',action:'LOGIN',content:'Facebook使用手机端APP登录沃登后台管理系统',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 13:24:47',modifyDate:'2023/3/25 13:24:47'},
                        {id:4,name:'Sumsang',face:'/images/face/f4.png',ip:'212.32.33.143',action:'PUBLISH',content:'Sumsang发布商品信息 沃登多功能无人机',appType:'ANDROID',terminal:'MOBILE',createDate:'2023/3/25 14:33:53',modifyDate:'2023/3/25 14:33:53'},
                        {id:5,name:'Oracle',face:'/images/face/f5.png',ip:'25.212.35.33',action:'JOIN',content:'Oracle加入项目产品飞车',appType:'WEIXIN',terminal:'MAC',createDate:'2023/3/25 15:17:28',modifyDate:'2023/3/25 15:17:28'},
                        {id:6,name:'Microsoft',face:'/images/face/f1.png',ip:'142.12.48.109',action:'DELETE',content:'Microsoft删除了订单： PSN49837246',appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},               
                        {id:7,name:'Microsoft',face:'/images/face/f1.png',ip:'153.154.33.43',action:'MODIFY',content:'Microsoft修改了用户(173****234)的登录密码',appType:'OTHER',terminal:'PC',createDate:'2023/3/25 13:22:27',modifyDate:'2023/3/25 13:22:27'},
                        {id:8,name:'Sumsang',face:'/images/face/f4.png',ip:'188.156.212.39',action:'LOGIN',content:'Sumsang使用手机端APP登录沃登后台管理系统',appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 13:24:47',modifyDate:'2023/3/25 13:24:47'},
                        {id:9,name:'Sumsang',face:'/images/face/f4.png',ip:'224.38.166.79',action:'PUBLISH',content:'Sumsang发布商品信息 沃登多功能无人机',appType:'ANDROID',terminal:'MOBILE',createDate:'2023/3/25 14:33:53',modifyDate:'2023/3/25 14:33:53'},
                        {id:10,name:'Google',face:'/images/face/f2.png',ip:'132.58.216.44',action:'JOIN',content:'Google加入项目产品飞车',appType:'WEIXIN',terminal:'MAC',createDate:'2023/3/25 15:17:28',modifyDate:'2023/3/25 15:17:28'},
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:12
                    }
                }
            )
        }
    }
}