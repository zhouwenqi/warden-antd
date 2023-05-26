export default {
    'POST /api/couponBitchs':(req:any,res:any)=>{
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
    }
}