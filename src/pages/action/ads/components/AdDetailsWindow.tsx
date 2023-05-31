import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText, getTagColor } from "@/utils/stringUtils";
import { Button, Divider, Popconfirm, Space, Tag } from "antd";
import { useIntl } from "umi";
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

export interface AdDetailsWindowProps extends WindowProps {
    data?:AdData;
    onEdit?:(data:AdData)=>void
}

/**
 * Window - 广告详情
 * @param props 
 * @returns 
 */
const AdslotsDetailsWindow = (props:AdDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'ad.data.details.title'}),        
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
        panel = (<div data-warden-details="box">            
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.id'})}：</label><span>{data.id}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.title'})}：</label><span>{data.title}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'ad.data.property.slotsCode'})}：</label><span>{data.slotsCode}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'ad.data.property.content'})}：</label><span>{data.content}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.link'})}：</label><span>{data.link}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'ad.data.property.clickSum'})}：</label><span>{data.clickSum}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.order'})}：</label><span>{data.order}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.type'})}：</label><span><Tag>{getNsText(slotsTypeOptions,String(data.slotsType))}</Tag></span>
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