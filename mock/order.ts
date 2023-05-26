export default {
    'POST /api/orders':(req:any,res:any)=>{
        let list =  [
            {id:1,sn:'PM202083242',price:3900,account:'ZhangMaoqi',orderStatus:'Audited', paymentStatus:'Notpaid', paymentType:'Weixin', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:2,sn:'PM202324339',price:4180,account:'Xunsum2',orderStatus:'Completed', paymentStatus:'Paid', paymentType:'Alipay', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:3,sn:'PM202342786',price:3680,account:'HuangGangmo',orderStatus:'Completed', paymentStatus:'Paid', paymentType:'Weixin', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:4,sn:'PM202564334',price:5420,account:'Qingxuehang',orderStatus:'Unaudited', paymentStatus:'Notpaid', paymentType:'Applepay', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:5,sn:'PM245288635',price:2150,account:'MeiHengdong',orderStatus:'Cancel', paymentStatus:'Notpaid', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:6,sn:'PM202546754',price:6650,account:'ChaoChagomu',orderStatus:'Completed', paymentStatus:'Paid', paymentType:'Weixin', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:7,sn:'PM206549154',price:900,account:'DuangShanping',orderStatus:'Completed', paymentStatus:'Paid', paymentType:'Alipay', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:8,sn:'PM202549037',price:2950,account:'XiaoXiaoqian',orderStatus:'Cancel', paymentStatus:'Notpaid', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:9,sn:'PM202548345',price:1740,account:'PingHunxun',orderStatus:'Cancel', paymentStatus:'Notpaid',  createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
            {id:10,sn:'PM202363653',price:1998,account:'MoKangheng',orderStatus:'Audited', paymentStatus:'Notpaid', paymentType:'Applepay', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
        ]
        if(req.body.pagination.current > 1){
            list =  [
                {id:1,sn:'PM202083242',price:3900,account:'ZhangMaoqi',orderStatus:'Audited', paymentStatus:'Notpaid', paymentType:'Weixin', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                {id:2,sn:'PM202324339',price:4180,account:'Xunsum2',orderStatus:'Completed', paymentStatus:'Paid', paymentType:'Alipay', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                {id:3,sn:'PM202342786',price:3680,account:'HuangGangmo',orderStatus:'Completed', paymentStatus:'Paid', paymentType:'Weixin', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                {id:4,sn:'PM202564334',price:5420,account:'Qingxuehang',orderStatus:'Unaudited', paymentStatus:'Notpaid', paymentType:'Applepay', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
            ]
        }
        res.send({
            list,
            pagination:{
                ...req.body.pagination,
                total:12
            }
        })
    }
}