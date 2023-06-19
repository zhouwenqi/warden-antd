export default {
    'GET /api/user/current':(req:any,res:any)=>{
        const locale = req.headers.locale    
        const userInfo = locale == 'en-US' ? {            
            id:158820382,
            uid:'jackma',
            nickName:'JackMa',
            deptName: 'R&D',
            deptId: 25,
            postName: 'Development',
            postId: 14,
            createDate: '2023/6/12 23:22:18',
            loginDate: '2023/6/12 23:22:18',
            face:'/images/face.png',
            authoritys: ['order:payment:statistics','monitoring','visits','add:adslots','add:adslots','modify:adslots','dept:manager','user:add','user:modify','user:delete'],
            roles: ['manager','dev'],
            roleName:'Manager',
            gender:'Male',
            mobile:'180****2938',
            loginTotal:13729,
            loginIp:'202.98.173.95',        
            birthday:'2010/10/13',
            email:'superman@gmail.com',
            isRoot:false
        } : {
            id:158820382,
            uid:'jackma',
            nickName:'马邦德',
            deptName: '研发部',
            deptId: 25,
            postName: '前端工程师',
            postId: 14,
            createDate: '2023/6/12 23:22:18',
            loginDate: '2023/6/12 23:22:18',
            face:'/images/face.png',
            authoritys: ['order:payment:statistics','monitoring','visits','add:adslots','add:adslots','modify:adslots','dept:manager','user:add','user:modify','user:delete'],
            roles: ['manager','dev'],
            roleName:'管理员',
            gender:'男',
            mobile:'180****2938',
            loginTotal:13729,
            loginIp:'202.98.173.95',        
            birthday:'2010/10/13',
            email:'superman@gmail.com',
            isRoot:false
        }
        res.send(userInfo)
    },
    'POST /api/users':(req:any,res:any)=>{
        if(req.body.pagination.current > 1){
            res.send(
                {
                    list: [
                        {id:11,uid:'huagoiew',nickName:'张三',face:'/images/face/f1.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:3,deptName:'研发部',postId:6,postName:'移动开发工程师',roleId:[1,4,5],roleName:['售后人员','开发人员'],  createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:12,uid:'soeiwre',nickName:'李四',face:'/images/face/f2.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:false,deptId:4,deptName:'采购部',postId:11,postName:'运营总监',roleId:[1,4,5],roleName:['售后人员','开发人员'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:13,uid:'xoiewer',nickName:'王五',face:'/images/face/f3.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:5,deptName:'销售部',postId:14,postName:'售后主管',roleId:[1,4,5],roleName:['管理员'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:14,uid:'mmodiwer',nickName:'赵六',face:'/images/face/f4.png',gender:'Female',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:false,deptId:9,deptName:'财务部',postId:2,postName:'财务总监',roleId:[1,4,5],roleName:['管理员'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:14
                    }
                }
            )
        }else{
            res.send(
                {
                    list: [
                        {id:1,uid:'huagoiew',nickName:'张三',face:'/images/face/f1.png',gender:'Female',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:3,deptName:'研发部',postId:6,postName:'移动开发工程师',roleId:[1,4,5],roleName:['管理员','开发人员'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:2,uid:'soeiwre',nickName:'李四',face:'/images/face/f2.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:4,deptName:'采购部',postId:11,postName:'运营总监',roleId:[1,4,5],roleName:['开发人员'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:3,uid:'xoiewer',nickName:'王五',face:'/images/face/f3.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:5,deptName:'销售部',postId:14,postName:'售后主管',roleId:[1,4,5],roleName:['测试人员','开发人员'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:4,uid:'mmodiwer',nickName:'赵六',face:'/images/face/f4.png',gender:'Female',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:false,deptId:9,deptName:'财务部',postId:2,postName:'财务总监',roleId:[1,4,5],roleName:['管理员','测试人员'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},                      
                        {id:5,uid:'huagoiew',nickName:'张三',face:'/images/face/f1.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:3,deptName:'研发部',postId:6,postName:'移动开发工程师',roleId:[1,4,5],roleName:['推广','开发人员'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:6,uid:'soeiwre',nickName:'李四',face:'/images/face/f2.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:false,deptId:4,deptName:'采购部',postId:11,postName:'运营总监',roleId:[1,4,5],roleName:['管理员','开发人员'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:7,uid:'xoiewer',nickName:'王五',face:'/images/face/f3.png',gender:'Female',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:5,deptName:'销售部',postId:14,postName:'售后主管',roleId:[1,4,5],roleName:['开发人员'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:8,uid:'mmodiwer',nickName:'赵六',face:'/images/face/f4.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:9,deptName:'财务部',postId:2,postName:'财务总监',roleId:[1,4,5],roleName:['开发人员'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:9,uid:'huagoiew',nickName:'张三',face:'/images/face/f1.png',gender:'Female',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:false,deptId:3,deptName:'研发部',postId:6,postName:'移动开发工程师',roleId:[1,4,5],roleName:['开发人员'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:10,uid:'soeiwre',nickName:'李四',face:'/images/face/f2.png',gender:'Male',mobile:'18988882222',email:'xxxxx@gmail.com',birthday:'2009/11/24',enabled:true,deptId:4,deptName:'采购部',postId:11,postName:'运营总监',roleId:[1,4,5],roleName:['售后人员'],createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:14
                    }
                }
            )
        }
    }
}