export default {
    'POST /api/messages':(req:any,res:any)=>{
        const locale = req.headers.locale        
        if(req.body.pagination.current > 1){
            res.send({
                list:locale=='en-US' ? [
                    {id:11,msgType:'Event',title:'XXXXXX service is about to expire reminder',content:'Your subscription to XXXXXX service is about to expire in 2 days, please deal with it immediately',isRead:true, createDate:'2023/4/12 23:08:28'},
                    {id:12,msgType:'Notice',title:'Digital Certificate Management Service product notifications',content:'Dear xxxxxx: Your certificate cert- xxxxxx, bound domain name is xxxx.com on 2023-06-06 13:36:54 Download from the console, to ensure the security of your certificate, please confirm whether it is operated by you. If it is not your own operation, please contact us in time.',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:13,msgType:'Notice',title:'Cloud Resolution Resolution records delete notifications',content:'Dear xxxxxx: You deleted the DNS record of the domain name xxxx.com.',isRead:true, createDate:'2023/4/12 23:08:28'}
                ]  : [                   
                    {id:11,msgType:'Event',title:'XXXXXX服务即将到期提醒',content:'您订阅XXXXXX服务还有2天即将到期，请您即时处理',isRead:true, createDate:'2023/4/12 23:08:28'},
                    {id:12,msgType:'Notice',title:'模板审核结果反馈',content:'您好，您的xxxxxx 审核不通过，点击短信服务控制台查看审核详情。短信专属服务群已上线，您可在钉群内直接提交“xxxxx”申请，实时接收审核结果通知和修改建议。让您随时随地、轻松掌握短信使用情况。',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:13,msgType:'Notice',title:'月度消费报告-看清消费，优化成本！',content:'您好！感谢您使xxxxx，以下是您 2023 年 05 月的月度消费报告。如果您希望集中管理多家企业或多个账号的消费情况',isRead:false, createDate:'2023/4/12 23:08:28'},
                ],
                pagination:{
                    ...req.body.pagination,
                    total:13
                }
            })
        }else{
            res.send({
                list:locale=='en-US' ? [
                    {id:1,msgType:'Notice',title:'Digital Certificate Management Service product notifications',content:'Dear xxxxxx: Your certificate cert- xxxxxx, bound domain name is xxxx.com on 2023-06-06 13:36:54 Download from the console, to ensure the security of your certificate, please confirm whether it is operated by you. If it is not your own operation, please contact us in time.',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:2,msgType:'Notice',title:'Cloud Resolution Resolution records delete notifications',content:'Dear xxxxxx: You deleted the DNS record of the domain name xxxx.com.',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:3,msgType:'Notice',title:'Feedback on template review results',content:'Hello, your xxxxxx review failed, click the SMS console to view the review details. The SMS exclusive service group has been launched, and you can directly submit "xxxxxx" applications in the Dings group to receive real-time notification of review results and modification suggestions. Let you easily grasp SMS usage anytime, anywhere.',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:4,msgType:'Notice',title:'Monthly Consumption Report - See consumption and optimize costs!',content:'Hello! Thank you for making xxxxx, here is your monthly spending report for May 2023. If you want to centrally manage your spending across multiple businesses or accounts',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:5,msgType:'Promotion',title:'Good early summer gifts, special domain name surprises!',content:'Good early summer gifts, special domain name surprises!',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:6,msgType:'Promotion',title:'Newcomer Discount|Application monitoring limited time 1% discount to easily build an observation system',content:'Newcomer Discount|Application monitoring limited time 1% discount to easily build an observation system',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:7,msgType:'Event',title:'The XXXXXX instance is created',content:'The XXXXXX instance is created',isRead:true, createDate:'2023/4/12 23:08:28'},
                    {id:8,msgType:'Event',title:'XXXXXX service is about to expire reminder',content:'Your subscription to XXXXXX service is about to expire in 2 days, please deal with it immediately',isRead:true, createDate:'2023/4/12 23:08:28'},
                    {id:9,msgType:'Notice',title:'Digital Certificate Management Service product notifications',content:'Dear xxxxxx: Your certificate cert- xxxxxx, bound domain name is xxxx.com on 2023-06-06 13:36:54 Download from the console, to ensure the security of your certificate, please confirm whether it is operated by you. If it is not your own operation, please contact us in time.',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:10,msgType:'Notice',title:'Cloud Resolution Resolution records delete notifications',content:'Dear xxxxxx: You deleted the DNS record of the domain name xxxx.com.',isRead:true, createDate:'2023/4/12 23:08:28'},
                ]  : [
                    {id:1,msgType:'Notice',title:'数字证书管理服务产品通知',content:'尊敬的xxxxxx：您的证书 cert- xxxxx，绑定域名为 xxxx.com 于 2023-06-06 13:36:54 从控制台下载，为确保您证书的安全性，请确认是否是您本人操作。 如果不是您本人操作，请及时与我们联系。',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:2,msgType:'Notice',title:'云解析解析记录删除通知',content:'尊敬的xxxxxx：您对域名xxxx.com进行了解析记录的删除操作。',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:3,msgType:'Notice',title:'模板审核结果反馈',content:'您好，您的xxxxxx 审核不通过，点击短信服务控制台查看审核详情。短信专属服务群已上线，您可在钉群内直接提交“xxxxx”申请，实时接收审核结果通知和修改建议。让您随时随地、轻松掌握短信使用情况。',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:4,msgType:'Notice',title:'月度消费报告-看清消费，优化成本！',content:'您好！感谢您使xxxxx，以下是您 2023 年 05 月的月度消费报告。如果您希望集中管理多家企业或多个账号的消费情况',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:5,msgType:'Promotion',title:'初夏好礼，特惠域名惊喜来袭！',content:'初夏好礼，特惠域名惊喜来袭！',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:6,msgType:'Promotion',title:'新人特惠｜应用监控限时1折特惠，轻松搭建观测体系',content:'新人特惠｜应用监控限时1折特惠，轻松搭建观测体系',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:7,msgType:'Event',title:'XXXXXX实例创建成功',content:'XXXXXX实例创建成功',isRead:true, createDate:'2023/4/12 23:08:28'},
                    {id:8,msgType:'Event',title:'XXXXXX服务即将到期提醒',content:'您订阅XXXXXX服务还有2天即将到期，请您即时处理',isRead:true, createDate:'2023/4/12 23:08:28'},
                    {id:9,msgType:'Notice',title:'模板审核结果反馈',content:'您好，您的xxxxxx 审核不通过，点击短信服务控制台查看审核详情。短信专属服务群已上线，您可在钉群内直接提交“xxxxx”申请，实时接收审核结果通知和修改建议。让您随时随地、轻松掌握短信使用情况。',isRead:false, createDate:'2023/4/12 23:08:28'},
                    {id:10,msgType:'Notice',title:'月度消费报告-看清消费，优化成本！',content:'您好！感谢您使xxxxx，以下是您 2023 年 05 月的月度消费报告。如果您希望集中管理多家企业或多个账号的消费情况',isRead:true, createDate:'2023/4/12 23:08:28'},
                ],
                pagination:{
                    ...req.body.pagination,
                    total:13
                }
            })
        }
    }
}