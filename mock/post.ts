export default {
    'POST /api/posts':(req:any,res:any)=>{        
        if(req.body.pagination.current > 1){
            res.send(
                {
                    list: [
                        {id:11, code:'MP004423', name:'运营总监', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:12, code:'MP003324', name:'产品经理', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:13, code:'MP004452', name:'测试经理', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:14, code:'MP005532', name:'售后主管', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
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
                        {id:1, code:'MP001234', name:'总经理', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:2, code:'MP003324', name:'财务总监', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:3, code:'MP004416', name:'技术总监', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:4, code:'MP004462', name:'项目经理', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:5, code:'MP004423', name:'前端工程师', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:6, code:'MP005232', name:'移动开发工程师', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:7, code:'MP006234', name:'游戏开发工程师', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:8, code:'MP007745', name:'运维工程师', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:9, code:'MP008875', name:'数据工程师', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:10, code:'MP009986', name:'UI设计师', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
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