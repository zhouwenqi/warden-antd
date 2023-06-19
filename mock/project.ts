export default {
    'POST /api/project/top5':(req:any,res:any)=>{
        const locale = req.headers.locale
        const list = locale == 'en-US' ? 
        [
            {id:'1',name:'Calf school',code:'P208823',color:'#ff6600',icon:'/svg/project/p1.svg',createDate:'2022/12/8 23:22',description:'Creating value for corporate customers is the pursuit of the calf academy all along...',memberCount:4,speedCount:86,testCount:19},
            {id:'2',name:'CodeMonkey horde',code:'P442323',color:'#2e78ff',icon:'/svg/project/p2.svg',createDate:'2022/12/8 23:22',description:'Code Monkey horde APP is a real dating software with easy registration...',memberCount:12,speedCount:59,testCount:51},
            {id:'3',name:'Tea on Front-End',code:'A02342',color:'#ac36ca',icon:'/svg/project/p3.svg',createDate:'2022/12/8 23:22',description:'The front-end tea APP Naixue wants to create a lifestyle. Always between product...',memberCount:6,speedCount:38,testCount:67},
            {id:'4',name:'Product Speeder',code:'A093823',color:'#57ad2d',icon:'/svg/project/p4.svg',createDate:'2022/12/8 23:22',description:'Only for the product manager, others do not answer, product speeding...',memberCount:22,speedCount:93,testCount:31},
            {id:'5',name:'Test takeaway',code:'C324222',color:'#16b7da',icon:'/svg/project/p5.svg',createDate:'2022/12/8 23:22',description:'Test my sister\'s hand-stir-fried dishes...',memberCount:18,speedCount:49,testCount:76}
        ] : [
            {id:'1',name:'牛犊子学堂',code:'P208823',color:'#ff6600',icon:'/svg/project/p1.svg',createDate:'2022/12/8 23:22',description:'为企业客户创造价值是牛犊子学堂一直以来的追求，通过丰富的产品矩阵为...',memberCount:4,speedCount:86,testCount:19},
            {id:'2',name:'代码猴部落',code:'P442323',color:'#2e78ff',icon:'/svg/project/p2.svg',createDate:'2022/12/8 23:22',description:'代码猴部落APP是一款注册方便，秒速登录的真人交友软件，最大程度...',memberCount:12,speedCount:59,testCount:51},
            {id:'3',name:'前端的茶',code:'A02342',color:'#ac36ca',icon:'/svg/project/p3.svg',createDate:'2022/12/8 23:22',description:'前端的茶APP奈雪要打造的是一种生活方式。在产品与自然之间始终...',memberCount:6,speedCount:38,testCount:67},
            {id:'4',name:'产品飞车',code:'A093823',color:'#57ad2d',icon:'/svg/project/p4.svg',createDate:'2022/12/8 23:22',description:'只为产品经理服务，其它人不接，产品飞车带您快速进入天堂...',memberCount:22,speedCount:93,testCount:31},
            {id:'5',name:'测试外卖',code:'C324222',color:'#16b7da',icon:'/svg/project/p5.svg',createDate:'2022/12/8 23:22',description:'测试妹子亲手炒的菜并配送...',memberCount:18,speedCount:49,testCount:76}
        ]
        const chartTitle = locale == 'en-US' ? ['Test progress','Development progress'] :  ['测试进度','研发进度']
        res.send({chartTitle,list})
    },
    'POST /api/projects':(req:any,res:any)=>{
        const locale = req.headers.locale
        const list = locale == 'en-US' ? 
        [
            {id:'1',name:'Calf school',code:'P208823',color:'#ff6600',icon:'/svg/project/p1.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'Creating value for corporate customers is the pursuit of the calf academy all along...',memberCount:4},
            {id:'2',name:'CodeMonkey horde',code:'P442323',color:'#2e78ff',icon:'/svg/project/p2.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'Code Monkey horde APP is a real dating software with easy registration...',memberCount:12},
            {id:'3',name:'Tea on Front-End',code:'A02342',color:'#ac36ca',icon:'/svg/project/p3.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'The front-end tea APP Naixue wants to create a lifestyle. Always between product...',memberCount:6},
            {id:'4',name:'Product Speeder',code:'A093823',color:'#57ad2d',icon:'/svg/project/p4.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'Only for the product manager, others do not answer, product speeding...',memberCount:22},
            {id:'5',name:'Test takeaway',code:'C324222',color:'#16b7da',icon:'/svg/project/p5.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'Test my sister\'s hand-stir-fried dishes...',memberCount:18},
            {id:'6',name:'Pet Paradise',code:'B02932',color:'#6a528b',icon:'/svg/project/p6.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'Provides a platform for programmers to share their love and experiences with pet...',memberCount:48},
            {id:'7',name:'Gathering of Flowers',code:'B82932',color:'#a7275a',icon:'/svg/project/p7.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'1-3 hours to deliver flowers to your doorstep, with a specified date and...',memberCount:19},
            {id:'8',name:'Fishing party',code:'H20832',color:'#60c778',icon:'/svg/project/p8.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'Fishing will provide programmers with fishing techniques, bait formulas, and ...',memberCount:32}
        ] : [
            {id:'1',name:'牛犊子学堂',code:'P208823',color:'#ff6600',icon:'/svg/project/p1.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'为企业客户创造价值是牛犊子学堂一直以来的追求，通过丰富的产品矩阵为...',memberCount:4},
            {id:'2',name:'代码猴部落',code:'P442323',color:'#2e78ff',icon:'/svg/project/p2.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'代码猴部落APP是一款注册方便，秒速登录的真人交友软件，最大程度...',memberCount:12},
            {id:'3',name:'前端的茶',code:'A02342',color:'#ac36ca',icon:'/svg/project/p3.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'前端的茶APP奈雪要打造的是一种生活方式。在产品与自然之间始终...',memberCount:6},
            {id:'4',name:'产品飞车',code:'A093823',color:'#57ad2d',icon:'/svg/project/p4.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'只为产品经理服务，其它人不接，产品飞车带您快速进入天堂...',memberCount:22},
            {id:'5',name:'测试外卖',code:'C324222',color:'#16b7da',icon:'/svg/project/p5.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'测试妹子亲手炒的菜并配送...',memberCount:18},
            {id:'6',name:'宠物乐园',code:'B02932',color:'#6a528b',icon:'/svg/project/p6.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'为程序员提供了一个平台来分享他们对宠物养育的热爱与心得...',memberCount:48},
            {id:'7',name:'鲜花苑',code:'B82932',color:'#a7275a',icon:'/svg/project/p7.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'1-3小时送花上门，并可指定日期和时间范围配送，让心意准时到达...',memberCount:19},
            {id:'8',name:'钓友会',code:'H20832',color:'#60c778',icon:'/svg/project/p8.svg',createDate:'2022/12/8 23:22',modifyDate:'2022/12/8 23:22',description:'为程序员提供钓鱼技巧、饵料配方等钓鱼知识,和钓友分享晒渔获...',memberCount:32}
        ]
        res.send({list})
    }
}