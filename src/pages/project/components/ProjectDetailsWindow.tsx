import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { Avatar, Button, Divider, Space, Tag } from "antd"
import { useIntl } from "umi"
import { TeamOutlined} from '@ant-design/icons';

export interface ProjectDetailsWindowProps extends WindowProps {
    data?:ProjectData    
    onEdit?:(data:ProjectData)=>void;
}

/**
 * Window - 项目详情
 * @param props 
 * @returns 
 */
const ProjectDetailsWindow=(props:ProjectDetailsWindowProps)=>{
    const intl = useIntl()
    const {closeWindowHandler,data,...WindowProps} = props
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'project.window.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }
    
    const footerPanel = (<Space><Button onClick={()=>{props.onEdit!(data!)}}>{intl.formatMessage({id:'global.button.edit'})}</Button></Space>)
    const panel = data ? (<div data-warden-details="box">
        <div className="details-item" style={{alignItems:"flex-end",alignContent:"center",justifyContent:"center"}}>
            <span><img src={data.icon} /></span>
        </div>
        <Divider />
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.name'})}：</label><span style={{fontWeight:"bold"}}>{data.name}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'project.data.property.code'})}：</label><span>{data.code}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'project.data.property.memberCount'})}：</label><span><Tag icon={<TeamOutlined />} color="default">{data.memberCount}</Tag></span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.description'})}：</label><span>{data.description}</span>
        </div>
        <Divider />
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.createDate'})}：</label><span>{data.createDate}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.modifyDate'})}：</label><span>{data.modifyDate}</span>
        </div>
    </div>) : undefined

    return(
        <Window {...windowProps} footer={footerPanel}>
            {panel}
        </Window>
    )
}
export default ProjectDetailsWindow