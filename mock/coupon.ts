export default {
    'POST /api/coupon/batchs':(req:any,res:any)=>{
        let list =  [
            {id:1,name:'618活动满1000送500减券',quantity:50000,denomination:'500',where:1000,receiveMethod:'Active',receiveQuantity:40000,useQuantity:12000,couponType:'Cash',expireDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],enabled:true, receiveDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:2,name:'618活动满1800送800减券',quantity:20000,denomination:'800',where:1800,receiveMethod:'Active',receiveQuantity:15000,useQuantity:12000,couponType:'Cash',expireDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],enabled:true, receiveDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:3,name:'618活动满3000送1000减券',quantity:10000,denomination:'1000',where:3000,receiveMethod:'Active',receiveQuantity:8900,useQuantity:6000,couponType:'Cash',expireDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],enabled:true, receiveDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:4,name:'双11活动会员折扣券',quantity:10000,denomination:'0.7',where:0,receiveMethod:'Auto',receiveQuantity:7600,useQuantity:1600,couponType:'Discount',expireDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],enabled:true, receiveDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:5,name:'双12活动新会员兑换券',quantity:10000,denomination:'SN2084023',where:0,receiveMethod:'Auto',receiveQuantity:9800,useQuantity:2300,couponType:'Exchange',expireDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],enabled:false, receiveDate:['2023/6/18 23:59:59','2023/7/1 00:00:00'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
        ]
        res.send({
            list,
            pagination:{
                ...req.body.pagination,
                total:5
            }
        })
    },
    'POST /api/coupons':(req:any,res:any)=>{
        let list =  [
            {id:1,code:'20439284092877',batchId:1,denomination:'500',receiveMember:'ZhangShan',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:2,code:'20439284092809',batchId:1,denomination:'500',receiveMember:'PanChangjiang',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:3,code:'20439284093423',batchId:1,denomination:'500',receiveMember:'HuangHoug',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:4,code:'20439284093426',batchId:1,denomination:'500',receiveMember:'ZhouZhenzhen',status:'Use',receiveDate:'2023/7/1 00:00:00',useDate:'2023/7/2 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:5,code:'20439284092881',batchId:1,denomination:'500',receiveMember:'PingJian',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:6,code:'20439284092882',batchId:1,denomination:'500',receiveMember:'ChongHen',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:7,code:'20439284092883',batchId:1,denomination:'500',receiveMember:'LiaoChanghe',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:8,code:'20439284092884',batchId:1,denomination:'500',receiveMember:'PouTong',status:'Use',receiveDate:'2023/7/1 00:00:00',useDate:'2023/7/2 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:9,code:'20439284092885',batchId:1,denomination:'500',receiveMember:'XiaoMaotong',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:10,code:'20439284092886',batchId:2,denomination:'800',receiveMember:'HengGuodong',status:'Expire',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
        ]
        if(req.body.pagination.current > 1){
            list =  [
                {id:11,code:'20439284092887',batchId:2,denomination:'800',receiveMember:'MongShangjeng',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                {id:12,code:'20439284092888',batchId:2,denomination:'800',receiveMember:'HeBeiyang',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                {id:13,code:'20439284092889',batchId:2,denomination:'800',receiveMember:'MongChong',status:'Receive',receiveDate:'2023/7/1 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                {id:14,code:'20439284092890',batchId:2,denomination:'800',receiveMember:'GangHongda',status:'Use',receiveDate:'2023/7/1 00:00:00',useDate:'2023/7/2 00:00:00',createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
            ]
        }
        res.send({
            list,
            pagination:{
                ...req.body.pagination,
                total:14
            }
        })
    }
}