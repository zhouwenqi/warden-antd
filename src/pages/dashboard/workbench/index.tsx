import AppIcon from '@/components/AppIcon';
import AppButton from '@/components/button';
import {WardenPanel} from '@/components/panel';
import Container from '@/layouts/components/Container';
import { Avatar, List, Tag, Typography } from 'antd';
import { Link } from 'umi';
import GridPanel from './components/GridPanel';
import { TeamOutlined } from '@ant-design/icons';
const {Text} = Typography;

import styles from './index.less';
import AppChart from '@/components/AppChart';
/**
 * Page - 工作台
 * @returns 
 */
const WorkbenchPage = () => {
    return (
      <Container showBreadcrumb={false}>
        <WelcomePanel />
        <div className={styles.gridLayout}>
          <div className={styles.gridLeft}>
            <GridPanel />
            <div className={styles.logsBox}>
              <LogsPanel />
            </div>  
          </div>    
          <div className={styles.gridRight}>
            <ProjectsPanel />
          </div>
        </div>
      </Container>
    )
}

/** 欢迎面版 */
const WelcomePanel=()=>{
  return(
    <div className={styles.welcomeBox}>          
      <div className={styles.welcomeMemberBox}>
        <Link to="/member">
          <Avatar size={64} src="/images/face.png">User</Avatar>
        </Link>        
        <div className={styles.welcomeInfo}>
          <label>早安，<Link to="/system/profile">马邦德</Link>，祝你开心每一天！</label><br />
          <span className={styles.deptInfo}>研发部 - 高级工程师</span><Tag color="orange">管理员</Tag>
        </div>
      </div>
      <div className={styles.descInfo}>        
        <div className={styles.descItem}>
          <span>帐号ID</span><br />
          <label>827397238</label>
        </div>
        <div className={styles.descItem}>
          <span>手机号</span><br />
          <label>139***322</label>
        </div>
        <div className={styles.descItem}>
          <span>登录次数</span><br />
          <label>3089</label>
        </div>        
      </div>      
    </div>
  )
}

const TeamIcon=(props:{text:string})=>{
  return(
    <AppButton><><TeamOutlined  /> {props.text}</></AppButton>
  )
}

/** 参与项目面版 */
const ProjectsPanel=()=>{  
  const datas:Warkbench.Project[] = [
    {id:'1',name:'牛犊子学堂',icon:'/images/project/p1.png',createDate:'2022/12/8 23:22',description:'为企业客户创造价值是牛犊子学堂一直以来的追求，通过丰富的产品矩阵为...',memberCount:4,speedCount:86,testCount:19},
    {id:'2',name:'代码猴部落',icon:'/images/project/p2.png',createDate:'2022/12/8 23:22',description:'代码猴部落APP是一款注册方便，秒速登录的真人交友软件，最大程度...',memberCount:12,speedCount:59,testCount:51},
    {id:'3',name:'前端的茶',icon:'/images/project/p3.png',createDate:'2022/12/8 23:22',description:'前端的茶APP奈雪要打造的是一种生活方式。在产品与自然之间始终...',memberCount:6,speedCount:38,testCount:67},
    {id:'4',name:'产品飞车',icon:'/images/project/p4.png',createDate:'2022/12/8 23:22',description:'只为产品经理服务，其它人不接，产品飞车带您快速进入天堂...',memberCount:22,speedCount:93,testCount:31},
    {id:'4',name:'测试外卖',icon:'/images/project/p5.png',createDate:'2022/12/8 23:22',description:'测试妹子亲手炒的菜并配送...',memberCount:18,speedCount:49,testCount:76}
  ]

  let radarData:any[] = [{name:'speedCount',value:[]},{name:'testCount',value:[]}]
  let indicator = []
  datas.forEach((item)=>{
    radarData[0].value.push(item.speedCount)
    radarData[1].value.push(item.testCount)
    indicator.push({name:item.name})
  })

  const option = {    
    legend: {show:false},  
    color:['#5f91f3','#2ab531'],
    tooltip: {
      trigger: 'item',  
      valueFormatter:(value:string)=>(value +'%'),
      borderWidth: 0,
    },
    radar: [      
    {
      indicator: datas,
      radius: 120,
      axisName: {
        show:false,        
      },
      show:false
    }
    ],
    xAxis:{
      show:false
    },    
    grid:{
      top:'0px',
      left:'0px',
      right:'0px',
      bottom:'0px'
    },
    series: [
    {      
      type: 'radar', 
      data:[
        {      
          value:radarData[0].value,
          name:radarData[0].name,
          areaStyle: {
            color: {
                type:'radial',
                x:0.5,
                y:0.5,
                r:1,
                colorStops:[
                  {offset:0,color: 'rgba(93, 144, 246, 0.1)'},
                  {offset:1,color: 'rgba(93, 144, 246, 0.9)'}
                  
                ]
            }
          }
        },
        {      
          value:radarData[1].value,
          name:radarData[1].name,
          areaStyle: {
            color: 
            {
                type:'radial',
                x:0.5,
                y:0.5,
                r:1,
                colorStops:[
                  {offset:0,color: 'rgba(42, 181, 49, 0.1)'},
                  {offset:1,color: 'rgba(42, 181, 49, 0.9)'}
                ]
            }
          }
        }
      ]
    }    
    ]
  }
  

  return(
      <WardenPanel title="参与项目" moreElement={<AppButton><AppIcon name="next" style={{marginTop:'5px'}} size={14} color="#666" /></AppButton>}>
        <>
        <List itemLayout="horizontal" dataSource={datas} renderItem={(item)=>(
          <List.Item actions={[<TeamIcon text={''+item.memberCount} />]}>
            <List.Item.Meta
            avatar={<img className={styles.projectIco} src={item.icon} alt={item.name} />}
            title={<a href="https://ant.design">{item.name}</a>}
            description={item.description}            
          />          
            
          </List.Item>
        )}>          
        </List>
        <div>
          <AppChart option={option} style={{width:'100%',height:'308px'}} />
        </div>
        </>
      </WardenPanel>
  )
}

/** 日志面版 */
const LogsPanel=()=>{
  const data = [
    {uid:'Apple',ico:'/images/face/f1.png',time:'2022/12/8 23:24',content:(<><Text strong>Apple </Text><Text type="success">审核</Text><Text> 了一张订单： </Text><Text type="secondary">PSN204823422</Text></>)},
    {uid:'Microsoft',ico:'/images/face/f2.png',time:'2022/12/8 23:24',content:<><Text strong>Microsoft </Text><Text type="danger">删除</Text><Text> 了订单： </Text><Text type="secondary" delete>PSN49837246</Text></>},
    {uid:'Google',ico:'/images/face/f3.png',time:'2022/12/8 23:24',content:<><Text strong>Google </Text><Text type="warning">修改</Text><Text> 了用户(173****234)的 </Text><Text type="secondary">登录密码</Text></>},    
    {uid:'Facebook',ico:'/images/face/f4.png',time:'2022/12/8 23:24',content:<><Text strong>Facebook </Text><Text> 使用手机端APP </Text><Text type="success">登录</Text><Text type="secondary"> 沃登后台管理系统</Text></>},  
    {uid:'Sumsang',ico:'/images/face/f5.png',time:'2022/12/8 23:24',content:<><Text strong>Sumsang </Text><Text type="success">发布</Text><Text> 商品信息 </Text><Text type="secondary"> 沃登多功能无人机</Text></>},  
    {uid:'Oracle',ico:'/images/face/f6.png',time:'2022/12/8 23:24',content:<><Text strong>Oracle </Text><Text type="success">加入</Text><Text> 项目 </Text><Text type="secondary"> 产品飞车</Text></>}, 
    
  ]
  return(
    <WardenPanel title="团队日志" style={{paddingBottom:'0px'}} moreElement={<AppButton><AppIcon name="next" style={{marginTop:'5px'}} size={14} color="#666" /></AppButton>}>
        <List size="small" itemLayout="horizontal" dataSource={data} renderItem={(item)=>(
          <List.Item actions={[<a>查看</a>]}>
            <List.Item.Meta
            avatar={<Avatar size={30} src={item.ico} alt={item.uid} />}
            title={<a href="https://ant.design">{item.uid}</a>}
            description={item.time}            
          />          
            <div>{item.content}</div>  
          </List.Item>
        )}>          
        </List>
    </WardenPanel>
  )
}
  
export default WorkbenchPage;