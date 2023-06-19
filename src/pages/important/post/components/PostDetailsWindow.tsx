import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { Button, Divider, Popconfirm, Space, Tag } from "antd";
import { useIntl } from "umi";
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

export interface PostDetailsWindowProps extends WindowProps {
    data?:PostData;
    onEdit?:(data:PostData)=>void
}

/**
 * Window - 岗位详情
 * @param props 
 * @returns 
 */
const PostDetailsWindow = (props:PostDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'dept.window.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }


    let footerPanel = (
        <Space>
            <Button icon={<EditOutlined />} onClick={()=>{props.onEdit!(data!)}}>{intl.formatMessage({id:'global.button.edit'})}</Button>
            <Popconfirm placement="topLeft" onConfirm={()=>{closeWindowHandler!(false)}} title={intl.formatMessage({id:'global.button.tooltip.delete'})}><Button icon={<DeleteOutlined />} type="primary" danger>{intl.formatMessage({id:'global.button.delete'})}</Button></Popconfirm>
        </Space>
    )

    let panel = <></>    
    if(data){        
        panel = (<div data-warden-details="box">            
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.id'})}：</label><span>{data.id}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'dept.data.property.name'})}：</label><span>{data.name}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'dept.data.property.code'})}：</label><span>{data.code}</span>
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
        </div>)
    }
    return(
        <Window {...windowProps} footer={footerPanel}>
            {panel}
        </Window>
    )
}
export default PostDetailsWindow