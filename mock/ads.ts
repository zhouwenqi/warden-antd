export default {
    'POST /api/action/ads':(req:any,res:any)=>{
        const local = req.headers.local
        if(req.body.pagination.current > 1){
            res.send(
                {
                    list: [
                        {id:8,slotsId:4,slotsCode:'T-009208326',title:'Configure and manage',content:'/images/screen2.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:34,order:24,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:9,slotsId:4,slotsCode:'T-009208326',title:'Explore quick start templates',content:'/images/screen3.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:34,order:26,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:10,slotsId:4,slotsCode:'T-009208326',title:'Learn core concepts',content:'/images/screen1.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:18,order:30,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'}
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:13
                    }
                }
            )
        }else{
            res.send(
                {
                    list: [
                        {id:1,slotsId:1,slotsCode:'T-009208328',title:'Learn core concepts',content:'/images/screen1.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:18,order:1,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:2,slotsId:1,slotsCode:'T-009208328',title:'Configure and manage',content:'/images/screen2.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:34,order:2,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:3,slotsId:1,slotsCode:'T-009208328',title:'Explore quick start templates',content:'/images/screen3.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Video',clickSum:34,order:3,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:4,slotsId:1,slotsCode:'T-009208328',title:'Learn core concepts',content:'/images/screen1.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:18,order:4,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:5,slotsId:2,slotsCode:'S-009208329',title:'Configure and manage',content:'/images/screen2.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:34,order:5,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:6,slotsId:2,slotsCode:'S-009208329',title:'Explore quick start templates',content:'/images/screen3.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Video',clickSum:34,order:6,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:7,slotsId:2,slotsCode:'S-009208329',title:'Learn core concepts',content:'/images/screen1.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:18,order:7,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:8,slotsId:3,slotsCode:'T-009208325',title:'Configure and manage',content:'/images/screen2.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:34,order:9,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:9,slotsId:3,slotsCode:'T-009208325',title:'Explore quick start templates',content:'/images/screen3.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:34,order:18,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'},
                        {id:10,slotsId:3,slotsCode:'T-009208325',title:'Learn core concepts',content:'/images/screen1.png',link:'https://github.com/zhouwenqi/warden-antd',slotsType:'Image',clickSum:18,order:22,expire:'2023/6/25 13:12:37',createDate:'2023/3/25 13:12:37',modifyDate:'2023/3/25 23:12:37'}
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:13
                    }
                }
            )
        }
    }
}