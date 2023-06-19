import Container from '@/layouts/components/Container'
import styles from './index.less'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Button, Segmented, Space,message } from 'antd'
import { useIntl } from 'umi'
import { useEffect, useState } from 'react'
import ProjectGridPanel from './components/ProjectGridPanel'
import { SegmentedValue } from 'antd/lib/segmented'
import ProjectListPanel from './components/ProjectListPanel'
import ProjectDetailsWindow,{ProjectDetailsWindowProps} from './components/ProjectDetailsWindow'
import ProjectFormWindow, { ProjectFormWindowProps } from './components/ProjectFormWindow'

/**
 * Page - 项目管理
 * @returns 
 */
const ProjectPage=()=>{
    
    const intl = useIntl()
    const locale = intl.locale 
    const [data,setData] = useState<{list:ProjectData[]}>({list:[]})
    const [viewStyle,setViewStyle]=useState<string|number>("Card")
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<ProjectData>()
    const [detailsWindowOpen,setDetailsWindowOpen]=useState<boolean>(false)
    const [detailsWindowData,setDetailsWindowData]=useState<ProjectData>()
    useEffect(()=>{
      getProjectData()
    },[locale])

    const getProjectData=()=>{
      fetch('/api/projects',{
          method:'POST',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              locale
          }
      })
      .then((response) => response.json())
      .then((results ) => {
          setData(results);
      })
    }

    const segmentedData = [
        {
            label: intl.formatMessage({id:'global.button.list'}),
            value: 'list',
            icon: <BarsOutlined />,
        },
        {
            label: intl.formatMessage({id:'global.button.card'}),
            value: 'Card',
            icon: <AppstoreOutlined />,
        },
    ]

    const onStyleChangeHandler=(value:SegmentedValue)=>{
        setViewStyle(value)
    }

    const onCreateHandler=()=>{
        setFormWindowData(undefined)
        setFormWindowOpen(true)
    }

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

    const onViewDetailsHandler=(e:ProjectData)=>{
        setDetailsWindowData(e)
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

    const listPanel = viewStyle == 'list' ? <ProjectListPanel onCreate={onCreateHandler} onViewDetails={onViewDetailsHandler} data={data.list} /> : <ProjectGridPanel onCreate={onCreateHandler} onViewDetails={onViewDetailsHandler} data={data.list} />

    return (        
        <Container showTitle={true}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <Segmented defaultValue={viewStyle}  options={segmentedData} onChange={onStyleChangeHandler} />                    
                </div>
                {listPanel}
            </div>
            <ProjectDetailsWindow {...detailsWindowProps} />
            <ProjectFormWindow {...formWindowProps} />            
        </Container>
    )
}
export default ProjectPage