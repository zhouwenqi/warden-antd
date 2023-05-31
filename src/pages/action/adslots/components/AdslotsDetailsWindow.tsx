import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText, getTagColor } from "@/utils/stringUtils";
import { Button, Divider, Popconfirm, Space, Tag } from "antd";
import { useIntl } from "umi";
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

export interface AdslotsDetailsWindowProps extends WindowProps {
    data?:AdslotsData;
    onEdit?:(data:AdslotsData)=>void
}

/**
 * Window - 广告位详情
 * @param props 
 * @returns 
 */
const AdslotsDetailsWindow = (props:AdslotsDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'adslots.data.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const slotsTypeOptions = [
        {text:intl.formatMessage({id:'adslots.data.option.type.image'}),value:'Image'},
        {text:intl.formatMessage({id:'adslots.data.option.type.video'}),value:'Video'},
        {text:intl.formatMessage({id:'adslots.data.option.type.text'}),value:'Text'},
    ]

    const slotsEnables =[
        {text:intl.formatMessage({id:'global.button.disable'}),value:'false'}, 
        {text:intl.formatMessage({id:'global.button.enable'}),value:'true'}
    ]

    let footerPanel = (
        <Space>
            <Button icon={<EditOutlined />} onClick={()=>{props.onEdit!(data!)}}>{intl.formatMessage({id:'global.button.edit'})}</Button>
            <Popconfirm placement="topLeft" onConfirm={()=>{closeWindowHandler!(false)}} title={intl.formatMessage({id:'global.button.tooltip.delete'})}><Button icon={<DeleteOutlined />} type="primary" danger>{intl.formatMessage({id:'global.button.delete'})}</Button></Popconfirm>
        </Space>
    )

    let panel = <></>    
    if(data){        
        const enablePanel = <Tag color={data.enabled ? 'success' : 'error'}>{getNsText(slotsEnables, String(data.enabled))}</Tag>
        panel = (<div data-warden-details="box">            
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.id'})}：</label><span>{data.id}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.name'})}：</label><span>{data.name}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'adslots.data.property.code'})}：</label><span>{data.code}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.width'})}：</label><span>{data.width}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.height'})}：</label><span>{data.height}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.quantity'})}：</label><span>{data.quantity}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.type'})}：</label><span><Tag>{getNsText(slotsTypeOptions,String(data.slotsType))}</Tag></span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.description'})}：</label><span>{data.description}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.enable'})}：</label><span>{enablePanel}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.terminal'})}：</label><span><Tag>{data.terminal}</Tag></span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.application'})}：</label><span><Tag>{data.appType}</Tag></span>
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
export default AdslotsDetailsWindow