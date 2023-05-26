import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge, Button, Divider, Popconfirm, Space, Tooltip } from "antd";
import { useIntl } from "umi";
import { WechatFilled,AlipayOutlined,AppleFilled,PayCircleOutlined,DeleteOutlined } from '@ant-design/icons';
import Marquee from 'react-fast-marquee';

export interface OrderDetailsWindowProps extends WindowProps {
    data?:OrderData;
}

const OrderDetailsWindow=(props:OrderDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'order.data.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const orderStatuss =[
        {text:intl.formatMessage({id:'order.data.order.status.unaudited'}),value:'Unaudited'}, 
        {text:intl.formatMessage({id:'order.data.order.status.audited'}),value:'Audited'}, 
        {text:intl.formatMessage({id:'order.data.order.status.cancel'}),value:'Cancel'}, 
        {text:intl.formatMessage({id:'order.data.order.status.completed'}),value:'Completed'}, 
    ]

    const paymentStatuss =[
        {text:intl.formatMessage({id:'order.data.payment.status.notpaid'}),value:'Notpaid'}, 
        {text:intl.formatMessage({id:'order.data.payment.status.paid'}),value:'Paid'}
    ]

    const paymentTypes =[
        {text:intl.formatMessage({id:'order.data.payment.type.weixin'}),value:'Weixin'}, 
        {text:intl.formatMessage({id:'order.data.payment.type.alipay'}),value:'Alipay'},
        {text:intl.formatMessage({id:'order.data.payment.type.applepay'}),value:'Applepay'}
    ]
    let footerPanel = undefined
    let panel = <></>
    if(data){
        let badgeOrderStatus = <Badge status="default" />               
        switch(data.orderStatus){
            case "Completed":
                badgeOrderStatus = <Badge status="success" />
                break
            case "Audited":
                badgeOrderStatus = <Badge status="processing" />
                break
            case "Unaudited":
                badgeOrderStatus = <Badge status="warning" />
                break
        }  
        const orderStatusPanel = (<Space>{badgeOrderStatus} {getNsText(orderStatuss,data.orderStatus)}</Space>)

        let badgePaymentStatus = <Badge status="default" />                
        switch(data.paymentStatus){
            case "Notpaid":
                badgePaymentStatus = <Badge status="warning" />
                break
            case "Paid":
                badgePaymentStatus = <Badge status="success" />
                break
        }
        const paymentStatusPanel = (<Space>{badgePaymentStatus} {getNsText(paymentStatuss,data.paymentStatus)}</Space>)
        
        const tag = getNsText(paymentTypes,data.paymentType!)
        let paymentTypePanel = undefined    
        switch(data.paymentType!){
            case "Weixin":
                paymentTypePanel = <Tooltip title={tag}><WechatFilled style={{color:"#52c232"}} /></Tooltip>
                break
            case "Alipay":
                paymentTypePanel = <Tooltip title={tag}><AlipayOutlined style={{color:"#01a0ea"}} /></Tooltip>
                break
            case "Applepay":
                paymentTypePanel = <Tooltip title={tag}><AppleFilled style={{color:"#333333"}} /></Tooltip>
                break                    
        }

        

        if(data.orderStatus == 'Completed'){
            footerPanel = <Alert message={intl.formatMessage({id:'order.data.alert.completed'})} type="success" showIcon />
        }else if(data.orderStatus == 'Unaudited'){
            footerPanel = (<Space><Button type="primary" onClick={()=>{}}>{intl.formatMessage({id:'global.button.audit'})}</Button></Space>)
        }else if(data.orderStatus == 'Cancel'){
            footerPanel = (<Space>                
                <Popconfirm  placement="topLeft" onConfirm={()=>{closeWindowHandler!(false)}} title={intl.formatMessage({id:'order.data.alert.delete.title'})}><Button type="primary" icon={<DeleteOutlined />} danger onClick={()=>{}}>{intl.formatMessage({id:'global.button.delete'})}</Button></Popconfirm>
                <Marquee pauseOnHover gradient={false}>{intl.formatMessage({id:'order.data.alert.cancel'})}</Marquee>
            </Space>)
        }else if(data.paymentStatus == 'Notpaid' && data.orderStatus=='Audited'){
            footerPanel = (<Space><Button type="primary" icon={<PayCircleOutlined />} onClick={()=>{}}>{intl.formatMessage({id:'global.button.payment'})}</Button></Space>)
        }

        panel = (<div data-warden-details="box">
            <div className="details-item">
            <label>{intl.formatMessage({id:'order.data.property.sn'})}：</label><span>{data.sn}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'order.data.property.account'})}：</label><span>{data.account}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'order.data.property.price'})}：</label><span style={{fontSize:"24px",color:'red'}}>${data.price}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'order.data.property.orderStatus'})}：</label><span>{orderStatusPanel}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'order.data.property.paymentStatus'})}：</label><span>{paymentStatusPanel}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'order.data.property.paymentType'})}：</label><span>{paymentTypePanel}</span>
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
export default OrderDetailsWindow