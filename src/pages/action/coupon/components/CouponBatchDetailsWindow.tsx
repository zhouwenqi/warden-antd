import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge, Button, Divider, Popconfirm, Space, Tag, message,notification } from "antd";
import { useIntl } from "umi";
import { UnorderedListOutlined,BlockOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import CouponListWindow, { CouponListWindowProps } from "./CouponListWindow";
import CouponIssuanceWindow, { CouponIssuanceWindowProps } from './CouponIssuanceWindow';
import { useState } from "react";


export interface CouponDetailsWindowProps extends WindowProps {
    data?:CouponBatchData;
    onEdit?:(data:CouponBatchData)=>void;
    onIssuance?:(data:CouponBatchData)=>void;
}

/**
 * Window - 优惠券批次详情
 * @param props 
 * @returns 
 */
const CouponBatchDetailsWindow=(props:CouponDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const [listWindowOpen,setListWindowOpen]=useState<boolean>(false)
    const [listWindowData,setListWindowData]=useState<CouponBatchData>()
    const [issuanceWindowOpen,setIssuanceWindowOpen]=useState<boolean>(false)
    const [issuanceWindowData,setIssuanceWindowData]=useState<CouponBatchData>()
    
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'couponBatch.data.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const bitchEnables =[
        {text:intl.formatMessage({id:'global.button.disable'}),value:'false'}, 
        {text:intl.formatMessage({id:'global.button.enable'}),value:'true'}
    ]

    const receiveMethods =[
        {text:intl.formatMessage({id:'couponBatch.data.receiveMethod.auto'}),value:'Auto'}, 
        {text:intl.formatMessage({id:'couponBatch.data.receiveMethod.active'}),value:'Active'}
    ]

    const couponTypes =[
        {text:intl.formatMessage({id:'couponBatch.data.couponType.cash'}),value:'Cash'}, 
        {text:intl.formatMessage({id:'couponBatch.data.couponType.discount'}),value:'Discount'},
        {text:intl.formatMessage({id:'couponBatch.data.couponType.exchange'}),value:'Exchange'}
    ]
 
    const onClickListHandler=()=>{
        setListWindowData(data)        
        setListWindowOpen(true)
    }

    const onClickIssuanceHandler=()=>{
        setIssuanceWindowData(data)
        setIssuanceWindowOpen(true)
    }
    
    const onIssuanceHandler=(e:IssuanceData)=>{
        const key = 'couponIssuanceSubmit'
        message.loading({ content: intl.formatMessage({id:'global.message.submitting'}), key })
        setTimeout(() => {
            message.success({ content: intl.formatMessage({id:'couponIssuance.alert.generating.submit'}), key, duration: 2 })
            setIssuanceWindowOpen(false)
            setTimeout(()=>{
                notification.success({
                    message:intl.formatMessage({id:'couponIssuance.alert.generating.complate.title'}),
                    description:intl.formatMessage({id:'couponIssuance.alert.generating.complate.content'},{quantity:e.quantity}),
                    placement:'bottomRight'
                })
            },5000)
        }, 1000)

    }

    const windowListProps:CouponListWindowProps ={
        open:listWindowOpen,
        data:listWindowData,
        closeWindowHandler:setListWindowOpen
    }

    const windowIssuanceProps:CouponIssuanceWindowProps ={
        open:issuanceWindowOpen,
        data:issuanceWindowData,
        onSubmit:onIssuanceHandler,        
        closeWindowHandler:setIssuanceWindowOpen
    }

    let footerPanel = (
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Space>
                <Button icon={<EditOutlined />} onClick={()=>{props.onEdit!(data!)}}>{intl.formatMessage({id:'global.button.edit'})}</Button>
                <Popconfirm placement="topLeft" onConfirm={()=>{closeWindowHandler!(false)}} title={intl.formatMessage({id:'couponBatch.alert.delete.title'})}><Button icon={<DeleteOutlined />} type="primary" danger>{intl.formatMessage({id:'global.button.delete'})}</Button></Popconfirm>
            </Space>
            <Space>
                <Button icon={<UnorderedListOutlined />} onClick={()=>{onClickListHandler()}}>{intl.formatMessage({id:'couponBatch.button.list'})}</Button>
                <Button onClick={()=>{onClickIssuanceHandler()}} icon={<BlockOutlined />}>{intl.formatMessage({id:'couponBatch.button.issuance'})}</Button>
            </Space>
        </div>
    )
    
    let panel = <></>
    if(data){
        const enablePanel = <Tag color={data.enabled ? 'success' : 'error'}>{getNsText(bitchEnables, String(data.enabled))}</Tag>             
        const receiveMethodPanel = <Tag>{getNsText(receiveMethods,data.receiveMethod)}</Tag>
        const couponTypePanel = <Tag>{getNsText(couponTypes,data.couponType)}</Tag>
        panel = (<div data-warden-details="box">
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.name'})}：</label><span>{data.name}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.quantity'})}：</label><span>{data.quantity}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.denomination'})}：</label><span style={{color:'red'}}>${data.denomination}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.where'})}：</label><span>{data.where}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.receiveMethod'})}：</label><span>{receiveMethodPanel}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.couponType'})}：</label><span>{couponTypePanel}</span>
            </div>    
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.enabled'})}：</label><span>{enablePanel}</span>
            </div>  
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.receiveDate'})}：</label><span>{data.receiveDate[0]} - {data.receiveDate[1]}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.expireDate'})}：</label><span>{data.expireDate[0]} - {data.expireDate[1]}</span>
            </div>  
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBatch.data.property.description'})}：</label><span>{data.description}</span>
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
            <CouponListWindow {...windowListProps} />
            <CouponIssuanceWindow {...windowIssuanceProps} />
        </Window>
    )
}
export default CouponBatchDetailsWindow