export default {
    'POST /api/dictionarys':(req:any,res:any)=>{
        const locale = req.headers.locale        
        if(req.body.pagination.current > 1){
            res.send({
                list:locale=='en-US' ? [
                    {id:11,type:'String',name:'Cast scrolling text ads',key:'scroll-ad-text',value:'uuuuuuuuuuuuuuuu',description:'Cast scrolling text ads', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:12,type:'Array',name:'Invoice type',key:'invoice-types',value:'xxxxxxxx',description:'Invoice type', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:13,type:'Object',name:'Automatically send red packet data',key:'auto-packet',value:'yyyyyyyyyyyyyyyy',description:'Automatically send red packet data', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
                ]  : [
                    {id:11,type:'String',name:'投屏滚动文字广告',key:'scroll-ad-text',value:'uuuuuuuuuuuuuuuu',description:'投屏滚动文字广告', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:12,type:'Array',name:'发票类型',key:'adTyps',value:'xxxxxxxx',description:'发票类型', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:13,type:'Object',name:'自动发送红包数据',key:'userInitData',value:'yyyyyyyyyyyyyyyy',description:'自动发送红包数据', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
                   
                ],
                pagination:{
                    ...req.body.pagination,
                    total:13
                }
            })
        }else{
            res.send({
                list:locale=='en-US' ? [
                    {id:1,type:'String',name:'Website name',key:'website-name',value:'World group',description:'Website name', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:2,type:'String',name:'Image server url',key:'image-server-url',value:'https://image.xxxxx.com',description:'Image server url', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:3,type:'Boolean',name:'Whether the server can be shut down remotely',key:'isClosedServer',value:'true',description:'Whether the server can be shut down remotely', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:4,type:'Boolean',name:'Version detection or not',key:'isCheckVersion',value:'true',description:'Version detection or not', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:5,type:'Boolean',name:'Whether to enable verification codes',key:'isEnableVerifyCode',value:'true',description:'Whether to enable verification codes', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:6,type:'Number',name:'Limit on the number of times a password is entered incorrectly',key:'passwordErrorLimit',value:'5',description:'Lock accounts beyond this value', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:7,type:'Number',name:'User check-in credit value',key:'signinPointer',value:'200',description:'User check-in credit value', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:8,type:'Array',name:'Coupon type',key:'couponTypes',value:'xxxxxxxx',description:'Coupon type', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:9,type:'Array',name:'Ad service type',key:'adTyps',value:'xxxxxxxx',description:'Ad service type', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:10,type:'Object',name:'Member initialization data',key:'userInitData',value:'yyyyyyyyyyyyyyyy',description:'Member initialization data', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
                ]  : [
                    {id:1,type:'String',name:'官网名称',key:'website-name',value:'天下会',description:'官网名称', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:2,type:'String',name:'图片服务器地址',key:'image-server-url',value:'https://image.xxxxx.com',description:'图片服务器地址', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:3,type:'Boolean',name:'是否可远程关闭服务器',key:'isClosedServer',value:'true',description:'是否可远程关闭服务器', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:4,type:'Boolean',name:'是否版本检测',key:'isCheckVersion',value:'true',description:'是否版本检测', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:5,type:'Boolean',name:'是否启用验证码',key:'isEnableVerifyCode',value:'true',description:'是否启用验证码', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:6,type:'Number',name:'密码输入错误次数限制',key:'passwordErrorLimit',value:'5',description:'超过这个值锁定帐号', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:7,type:'Number',name:'用户签到积分值',key:'signinPointer',value:'200',description:'用户签到积分值', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:8,type:'Array',name:'优惠券类型',key:'couponTypes',value:'xxxxxxxx',description:'优惠券类型', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:9,type:'Array',name:'广告业务类型',key:'adTyps',value:'xxxxxxxx',description:'广告业务类型', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'},
                    {id:10,type:'Object',name:'会员初始化数据',key:'userInitData',value:'yyyyyyyyyyyyyyyy',description:'会员初始化数据', createDate:'2023/4/12 23:08:28',modifyDate:'2023/4/12 23:08:28'}
                   
                ],
                pagination:{
                    ...req.body.pagination,
                    total:13
                }
            })
        }
    }
}