export default {
    'POST /api/projects':(req:any,res:any)=>{
        const local = req.headers.local
        const list = local == 'en-US' ? 
        [
            {id:'1',name:'Calf school',icon:'/images/project/p1.png',createDate:'2022/12/8 23:22',description:'Creating value for corporate customers is the pursuit of the calf academy all along...',memberCount:4,speedCount:86,testCount:19},
            {id:'2',name:'CodeMonkey horde',icon:'/images/project/p2.png',createDate:'2022/12/8 23:22',description:'Code Monkey horde APP is a real dating software with easy registration...',memberCount:12,speedCount:59,testCount:51},
            {id:'3',name:'Tea on Front-End',icon:'/images/project/p3.png',createDate:'2022/12/8 23:22',description:'The front-end tea APP Naixue wants to create a lifestyle. Always between product...',memberCount:6,speedCount:38,testCount:67},
            {id:'4',name:'Product Speeder',icon:'/images/project/p4.png',createDate:'2022/12/8 23:22',description:'Only for the product manager, others do not answer, product speeding...',memberCount:22,speedCount:93,testCount:31},
            {id:'5',name:'Test takeaway',icon:'/images/project/p5.png',createDate:'2022/12/8 23:22',description:'Test my sister\'s hand-stir-fried dishes...',memberCount:18,speedCount:49,testCount:76}
        ] : [
            {id:'1',name:'牛犊子学堂',icon:'/images/project/p1.png',createDate:'2022/12/8 23:22',description:'为企业客户创造价值是牛犊子学堂一直以来的追求，通过丰富的产品矩阵为...',memberCount:4,speedCount:86,testCount:19},
            {id:'2',name:'代码猴部落',icon:'/images/project/p2.png',createDate:'2022/12/8 23:22',description:'代码猴部落APP是一款注册方便，秒速登录的真人交友软件，最大程度...',memberCount:12,speedCount:59,testCount:51},
            {id:'3',name:'前端的茶',icon:'/images/project/p3.png',createDate:'2022/12/8 23:22',description:'前端的茶APP奈雪要打造的是一种生活方式。在产品与自然之间始终...',memberCount:6,speedCount:38,testCount:67},
            {id:'4',name:'产品飞车',icon:'/images/project/p4.png',createDate:'2022/12/8 23:22',description:'只为产品经理服务，其它人不接，产品飞车带您快速进入天堂...',memberCount:22,speedCount:93,testCount:31},
            {id:'5',name:'测试外卖',icon:'/images/project/p5.png',createDate:'2022/12/8 23:22',description:'测试妹子亲手炒的菜并配送...',memberCount:18,speedCount:49,testCount:76}
        ]
        const chartTitle = local == 'en-US' ? ['Test progress','Development progress'] :  ['测试试进度','研发进度']
        res.send({chartTitle,list})
    }
}