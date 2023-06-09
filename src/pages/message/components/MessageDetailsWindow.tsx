import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge, Button, Divider, Popconfirm, Space, Tag, Tooltip } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { useIntl } from "umi";

export interface OrderDetailsWindowProps extends WindowProps {
    data?:MessageData;
}

/**
 * Window - 消息详情
 * @param props 
 * @returns 
 */
const OrderDetailsWindow=(props:OrderDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'message.window.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const msgTypes =[
        {text:intl.formatMessage({id:'message.option.type.notice'}),value:'Notice'}, 
        {text:intl.formatMessage({id:'message.option.type.event'}),value:'Event'}, 
        {text:intl.formatMessage({id:'message.option.type.promotion'}),value:'Promotion'}
    ]

    let footerPanel = undefined
    let panel = <></>
    if(data){
        const typeText = getNsText(msgTypes,data.msgType)         
        let typeTag = <Tag color="processing">{typeText}</Tag>                           
        switch(data.msgType){
            case "Event":
                typeTag = <Tag color="orange">{typeText}</Tag>
                break
            case "Promotion":
                typeTag = <Tag color="magenta">{typeText}</Tag>
                break
        } 
        
        const readBadge = data.isRead ? <Space><Badge status="default" /> {intl.formatMessage({id:'message.option.read.true'})}</Space>: <Space><Badge status="processing" /> {intl.formatMessage({id:'message.option.read.false'})}</Space>

        footerPanel = <Space><Popconfirm onConfirm={()=>{closeWindowHandler!(false)}} title={intl.formatMessage({id:'message.alert.delete.title'})}><Button danger type="primary" icon={<DeleteOutlined />}>{intl.formatMessage({id:'global.button.delete'})}</Button></Popconfirm></Space>

        panel = (<div data-warden-details="box">
            <div className="details-item">
            <label>{intl.formatMessage({id:'global.data.property.id'})}：</label><span>{data.id}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'global.data.property.title'})}：</label><span>{data.title}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'message.data.property.type'})}：</label><span>{typeTag}</span>
            </div> 
            <div className="details-item">
            <label>{intl.formatMessage({id:'message.data.property.content'})}：</label><span>{data.content}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'message.data.property.read'})}：</label><span>{readBadge}</span>
            </div>                              
            <Divider />
            <div className="details-item">
            <label>{intl.formatMessage({id:'global.data.property.createDate'})}：</label><span>{data.createDate}</span>
            </div>
        </div>)
    }

    return(
        <Window {...windowProps} footer={footerPanel}>
            {panel}
        </Window>
    )
}
export default OrderDetailsWindow