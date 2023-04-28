export default {
    'POST /api/report/visits':(req:any,res:any)=>{        
        if(req.body.pagination.current > 1){
            res.send(
                {
                    list:[
                        {uuid:'AEA9A38818FA5879',uid:'apple',ip:'41.121.43.53',page:'https://m.com/BE576920E30C0E7B.html',time:'2023/6/12 23:22:49',appType:'WEB',terminal:'MAC'},
                        {uuid:'BEB62089BD33CA98',uid:'blue-blue',ip:'43.89.209.205',page:'https://m.com/BEB62089BD33CA98.html',time:'2023/4/12 23:22:49',appType:'WEB',terminal:'LINUX'}
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:12
                    }
                }
            )

        }else{
            res.send(
                {
                    list:[
                        {uuid:'85D661D792223F64',uid:'hemeosm',ip:'142.12.48.109',page:'https://www.xxx.com/85D661D792223F64.html',time:'2023/4/12 23:22:49',appType:'WEIXIN',terminal:'PC'},
                        {uuid:'AE422BB7290D7EDD',uid:'sunbook',ip:'220.32.133.57',page:'https://www.xxx.com/AE422BB7290D7EDD.html',time:'2023/4/12 23:22:49',appType:'WEB',terminal:'MAC'},
                        {uuid:'1875EA2D3F87948D',uid:'anna',ip:'220.142.48.44',page:'https://www.xxx.com/1875EA2D3F87948D.html',time:'2023/4/12 23:22:49',appType:'ANDROID',terminal:'MOBILE'},
                        {uuid:'F10C229F2F92C9A1',uid:'duoduo',ip:'42.79.124.54',page:'https://m.xxx.com/F10C229F2F92C9A1.html',time:'2023/4/12 23:22:49',appType:'WEIXIN',terminal:'MOBILE'},
                        {uuid:'BE576920E30C0E7B',uid:'socket',ip:'88.32.123.43',page:'https://m.com/soiewr.html',time:'2023/4/12 23:22:49',appType:'WEIXIN',terminal:'MAC'},
                        {uuid:'6C5C8E0169914CC3',uid:'tosmal',ip:'32.156.43.189',page:'https://m.com/6C5C8E0169914CC3.html',time:'2023/4/12 23:22:49',appType:'OTHER',terminal:'SERVER'},
                        {uuid:'382B3F59759560C5',uid:'spring',ip:'32.49.131.187',page:'https://www.xxx.com/85D661D792223F64.html',time:'2023/4/12 23:22:49',appType:'WEB',terminal:'PC'},
                        {uuid:'99121C138ECB7802',uid:'readying',ip:'221.23.54.52',page:'https://www.xxx.com/AE422BB7290D7EDD.html',time:'2023/4/12 23:22:49',appType:'IOS',terminal:'MOBILE'},
                        {uuid:'1925E47417DA696E',uid:'killbin',ip:'222.31.7.221',page:'https://www.xxx.com/1875EA2D3F87948D.html',time:'2023/4/12 23:22:49',appType:'ANDROID',terminal:'MOBILE'},
                        {uuid:'D709AEDAC4860177',uid:'devly',ip:'35.68.90.53',page:'https://m.xxx.com/F10C229F2F92C9A1.html',time:'2023/4/12 23:22:49',appType:'WEIXIN',terminal:'PC'},                
                    ],
                    pagination:{
                        ...req.body.pagination,
                        total:12
                    }
                }
            )
        }
        
        res.status(200).end()}
}