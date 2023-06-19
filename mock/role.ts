export default {
    'POST /api/roles':(req:any,res:any)=>{
        res.send(
            {
                list: [
                    {id:1, name:'超级管理员', value:'Super manager',description:'拥有所有权限且不能删除',authoritys:['monitoring','visits','modify:profile','view:project','create:project','add:coupon','audit:order'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:2, name:'管理员', value:'Manager',description:'拥有所有权限',authoritys:['monitoring','visits','modify:profile','view:project','create:project','add:coupon','audit:order'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:3, name:'开发人员', value:'Developer',authoritys:['monitoring','visits','modify:profile','view:project','create:project','add:coupon','audit:order'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:4, name:'财务人员', value:'Finance',authoritys:['monitoring','visits','modify:profile','view:project','create:project','add:coupon','audit:order'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:5, name:'营销推广', value:'Finance',authoritys:['monitoring','visits','modify:profile','view:project','create:project','add:coupon','audit:order'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:6, name:'售后', value:'Finance',authoritys:['monitoring','visits','modify:profile','view:project','create:project','add:coupon','audit:order'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:7, name:'来宾', value:'Finance', description:'只有查看权限',authoritys:['monitoring','visits','modify:profile','view:project','create:project','add:coupon','audit:order'], createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                ],
                pagination:{
                    ...req.body.pagination,
                    total:7
                }
            }
        )        
    }
    
}