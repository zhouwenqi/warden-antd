export default {
    'POST /api/depts':(req:any,res:any)=>{       
        res.send(
            {
                list: [
                    {id:1, code:'PT200283', name:'行政部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28',depts:[
                        {id:11, deptId:1,code:'PT200442', name:'总经办', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:12, deptId:1,code:'PT200553', name:'人事部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:13, deptId:1,code:'PT200449', name:'后勤部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    ]},
                    {id:2, code:'PT200244', name:'市场部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:3, code:'PT200324', name:'研发部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28',depts:[
                        {id:14, deptId:3,code:'PT200432', name:'大数据部门', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:15, deptId:3,code:'PT200564', name:'IT部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:16, deptId:3,code:'PT200665', name:'运维部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:17, deptId:3,code:'PT200665', name:'AI部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    ]},
                    {id:4, code:'PT200332', name:'采购部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:5, code:'PT200324', name:'生产部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:6, code:'PT200664', name:'销售部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:7, code:'PT200563', name:'推广部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28',depts:[
                        {id:18, deptId:7,code:'PT200442', name:'广告部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                        {id:19,deptId:7,code:'PT200553', name:'编辑部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    ]},
                    {id:9, code:'PT200563', name:'财务部', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
                ],
                pagination:{
                    ...req.body.pagination,
                    total:9
                }
            }
        )
    }
    
}