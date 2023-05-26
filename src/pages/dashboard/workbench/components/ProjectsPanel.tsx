import AppChart from "@/components/AppChart"
import AppButton from "@/components/button"
import { WardenPanel } from "@/components/panel"
import { List, message } from "antd"
import { useEffect, useRef, useState,MutableRefObject } from "react"
import { history, useIntl } from "umi"
import { TeamOutlined } from '@ant-design/icons'
import styles from './ProjectsPanel.less'
import AppIcon from "@/components/AppIcon"
import ProjectDetailsWindow,{ProjectDetailsWindowProps} from "@/pages/project/components/ProjectDetailsWindow"
import ProjectFormWindow,{ProjectFormWindowProps} from "@/pages/project/components/ProjectFormWindow"


/**
 * Panel - 参与项目面版
 * @returns 
 */
const ProjectsPanel=()=>{  
    const appChart:MutableRefObject<any> = useRef() 
    const intl = useIntl()
    const local = intl.locale 
    const [data,setData] = useState<{list:Warkbench.Project[],chartTitle:string[]}>()
    const [detailsWindowOpen,setDetailsWindowOpen]=useState<boolean>(false)
    const [detailsWindowData,setDetailsWindowData]=useState<ProjectData>()
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<ProjectData>()
    useEffect(()=>{
      getProjectData()
    },[local])



    const getProjectData=()=>{
      fetch('/api/project/top5',{
          method:'POST',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              "local":local
          }
      })
      .then((response) => response.json())
      .then((results ) => {
          setData(results);
      })
    }
   
    const updateOption=()=>{
      if(!data){
        return
      }
     
      let radarData:any[] = [{name:data.chartTitle[1],value:[]},{name:data.chartTitle[0],value:[]}]
      let indicator = []
      data.list.forEach((item)=>{
        radarData[0].value.push(item.speedCount)
        radarData[1].value.push(item.testCount)
        indicator.push({name:item.name})
      })
      const option = {
        radar: [      
          {
            indicator: data.list,
            radius: 120,
            axisName: {
              show:false,        
            },
            show:false
          }
        ],
        series:[{
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
        }]
      }
      if(appChart.current){
        appChart.current.setOption(option)
      }
    }
    
    let initOption = {    
      legend: {show:false},  
      color:['#5f91f3','#2ab531'],
      tooltip: {
        trigger: 'item',  
        valueFormatter:(value:string)=>(value +'%'),
        borderWidth: 0,
      },
      radar: [      
      {
        indicator: data,
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
          data:[]
        }    
      ]
    }  
    useEffect(()=>{
      updateOption()    
    },[local,data])

    const onEditHandler=(e:ProjectData)=>{
      setFormWindowData(e)
      setFormWindowOpen(true)
    }

    const onSubmitHandler=(e:ProjectData)=>{
        const key = 'projectSubmit'
        message.loading({ content: intl.formatMessage({id:'global.message.submitting'}), key })
        setTimeout(() => {
            message.success({ content: intl.formatMessage({id:'global.message.commit'}), key, duration: 2 })
            setFormWindowOpen(false)
        }, 1000)

    }


    const onViewDetailsHandler=(e:Warkbench.Project)=>{
      const project:ProjectData = {
        id:e.id,
        name:e.name,
        code:e.code,
        icon:e.icon,
        description:e.description,
        color:e.color,
        memberCount:e.memberCount,
        createDate:e.createDate,
        modifyDate:e.modifyDate

      }
      setDetailsWindowData(project)
      setDetailsWindowOpen(true)
    }

    const detailsWindowProps:ProjectDetailsWindowProps = {
        open:detailsWindowOpen,
        data:detailsWindowData,
        closeWindowHandler:setDetailsWindowOpen,
        onEdit:onEditHandler
    }

    
    const formWindowProps:ProjectFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }
    return(
        <>
        <WardenPanel title={intl.formatMessage({id:'workbench.card.projects.title'})} moreElement={<AppButton tooltip={intl.formatMessage({id:'tooltip.more'})}><AppIcon onClick={()=>{history.push('/main/worker/project')}} name="next" style={{marginTop:'5px'}} size={14} color="#666" /></AppButton>}>
          <>
          <List itemLayout="horizontal" dataSource={data?.list} renderItem={(item)=>(
            <List.Item actions={[<TeamIcon text={''+item.memberCount} />]}>
              <List.Item.Meta
              avatar={<img className={styles.projectIco} src={item.icon} alt={item.name} />}
              title={<a onClick={()=>{onViewDetailsHandler(item)}}>{item.name}</a>}
              description={item.description}
              key={item.id}      
            />          
              
            </List.Item>
          )}>          
          </List>
          <div>
            <AppChart ref={appChart} option={initOption} style={{width:'100%',height:'308px'}} />
          </div>
          </>
        </WardenPanel>
        <ProjectDetailsWindow {...detailsWindowProps} />
        <ProjectFormWindow {...formWindowProps} /> 
        </>
    )
  }

  const TeamIcon=(props:{text:string})=>{
    return(
      <AppButton><><TeamOutlined  /> {props.text}</></AppButton>
    )
  }

  export default ProjectsPanel