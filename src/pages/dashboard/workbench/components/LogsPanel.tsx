import AppIcon from "@/components/AppIcon";
import AppButton from "@/components/button";
import { WardenPanel } from "@/components/panel"
import { Avatar, List,Typography } from "antd"
import { useIntl } from "umi";
const {Text} = Typography;

/**
 * Panel - 日志面版
 * @returns 
 */
const LogsPanel=()=>{
    const intl = useIntl()    
    const cnData = [
      {uid:'Apple',ico:'/images/face/f1.png',time:'2022/12/8 23:24',content:(<><Text strong>Apple </Text><Text type="success">审核</Text><Text> 了一张订单： </Text><Text type="secondary">PSN204823422</Text></>)},
      {uid:'Microsoft',ico:'/images/face/f2.png',time:'2022/12/8 23:24',content:<><Text strong>Microsoft </Text><Text type="danger">删除</Text><Text> 了订单： </Text><Text type="secondary" delete>PSN49837246</Text></>},
      {uid:'Google',ico:'/images/face/f3.png',time:'2022/12/8 23:24',content:<><Text strong>Google </Text><Text type="warning">修改</Text><Text> 了用户(173****234)的 </Text><Text type="secondary">登录密码</Text></>},    
      {uid:'Facebook',ico:'/images/face/f4.png',time:'2022/12/8 23:24',content:<><Text strong>Facebook </Text><Text> 使用手机端APP </Text><Text type="success">登录</Text><Text type="secondary"> 沃登后台管理系统</Text></>},  
      {uid:'Sumsang',ico:'/images/face/f5.png',time:'2022/12/8 23:24',content:<><Text strong>Sumsang </Text><Text type="success">发布</Text><Text> 商品信息 </Text><Text type="secondary"> 沃登多功能无人机</Text></>},  
      {uid:'Oracle',ico:'/images/face/f6.png',time:'2022/12/8 23:24',content:<><Text strong>Oracle </Text><Text type="success">加入</Text><Text> 项目 </Text><Text type="secondary"> 产品飞车</Text></>}, 
      
    ]
    const enData = [
      {uid:'Apple',ico:'/images/face/f1.png',time:'2022/12/8 23:24',content:(<><Text strong>Apple </Text><Text type="success">Verify</Text><Text> an order： </Text><Text type="secondary">PSN204823422</Text></>)},
      {uid:'Microsoft',ico:'/images/face/f2.png',time:'2022/12/8 23:24',content:<><Text strong>Microsoft </Text><Text type="danger">Delete</Text><Text> an order： </Text><Text type="secondary" delete>PSN49837246</Text></>},
      {uid:'Google',ico:'/images/face/f3.png',time:'2022/12/8 23:24',content:<><Text strong>Google </Text><Text type="warning">Modify</Text><Text> user(173****234) is </Text><Text type="secondary">login password</Text></>},    
      {uid:'Facebook',ico:'/images/face/f4.png',time:'2022/12/8 23:24',content:<><Text strong>Facebook </Text><Text> use mobile-app </Text><Text type="success">Login</Text><Text type="secondary"> warden system</Text></>},  
      {uid:'Sumsang',ico:'/images/face/f5.png',time:'2022/12/8 23:24',content:<><Text strong>Sumsang </Text><Text type="success">Publish</Text><Text> product info </Text><Text type="secondary"> warden intelligent UAVs</Text></>},  
      {uid:'Oracle',ico:'/images/face/f6.png',time:'2022/12/8 23:24',content:<><Text strong>Oracle </Text><Text type="success">Join</Text><Text> project </Text><Text type="secondary"> PM fly up</Text></>}, 
      
    ]
    
    const data = intl.locale=='en-US' ? enData : cnData
    return(
      <WardenPanel title={intl.formatMessage({id:'workbench.card.logs.title'})} style={{paddingBottom:'0px'}} moreElement={<AppButton tooltip={intl.formatMessage({id:'tooltip.more'})}><AppIcon name="next" style={{marginTop:'5px'}} size={14} color="#666" /></AppButton>}>
          <List size="small" itemLayout="horizontal" dataSource={data} renderItem={(item)=>(
            <List.Item actions={[<a>{intl.formatMessage({id:'global.button.view'})}</a>]}>
              <List.Item.Meta
              avatar={<Avatar size={30} src={item.ico} alt={item.uid} />}
              title={<a href="https://ant.design">{item.uid}</a>}
              description={item.time}  
              key={item.uid}          
            />          
              <div>{item.content}</div>  
            </List.Item>
          )}>          
          </List>
      </WardenPanel>
    )
}
export default LogsPanel