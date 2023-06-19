export default {
    'POST /api/action/adslots':(req:any,res:any)=>{
        if(req.body.pagination.current > 1){
            res.send(
                {
                    list: [
                        {id:11,code:'T-009208328',name:'搜索列表分类广告',width:600,height:320,slotsType:'Image',quantity:5,enabled:true,appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:12,code:'S-009208329',name:'订单列表顶部轮播',width:600,height:320,slotsType:'Image',quantity:4,enabled:true,appType:'WEB',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:13,code:'S-009208330',name:'搜索历史左侧广告',width:600,height:320,slotsType:'Video',quantity:3,enabled:false,appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:14,code:'S-009208331',name:'搜索历史顶部广告',width:600,height:320,slotsType:'Video',quantity:4,enabled:true,appType:'ANDROID',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:15,code:'B-009208332',name:'首页推荐轮播',width:600,height:320,slotsType:'Image',quantity:5,enabled:true,appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'}
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:15
                    }
                }
            )
        }else{
            res.send(
                {
                    list: [
                        {id:1,code:'S-009208323',name:'首页顶部轮播广告',width:600,height:320,slotsType:'Image',quantity:5,enabled:true,appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:2,code:'S-009208324',name:'首页弹窗广告',width:400,height:240,slotsType:'Image',quantity:4,enabled:true,appType:'ANDROID',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:3,code:'T-009208325',name:'搜索页轮播广告',width:600,height:480,slotsType:'Image',quantity:3,enabled:true,appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:4,code:'T-009208326',name:'购物车商品推荐',width:600,height:320,slotsType:'Text',quantity:4,enabled:true,appType:'WEB',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:5,code:'S-009208327',name:'商品详情视频推荐',width:600,height:320,slotsType:'Text',quantity:4,enabled:false,appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:6,code:'T-009208328',name:'搜索列表分类广告',width:600,height:320,slotsType:'Image',quantity:4,enabled:true,appType:'IOS',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:7,code:'S-009208329',name:'订单列表顶部轮播',width:600,height:320,slotsType:'Image',quantity:4,enabled:true,appType:'WEB',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:8,code:'S-009208330',name:'搜索历史左侧广告',width:600,height:320,slotsType:'Video',quantity:5,enabled:false,appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:9,code:'S-009208331',name:'搜索历史顶部广告',width:600,height:320,slotsType:'Video',quantity:3,enabled:false,appType:'ANDROID',terminal:'MOBILE',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:10,code:'B-009208332',name:'首页推荐轮播',width:600,height:320,slotsType:'Image',quantity:5,enabled:true,appType:'WEB',terminal:'PC',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'}
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:15
                    }
                }
            )
        }
    }
}