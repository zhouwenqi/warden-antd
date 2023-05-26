import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge, Button, Divider, Popconfirm, Space, Tag, Tooltip } from "antd";
import { useIntl } from "umi";
import { UnorderedListOutlined,BlockOutlined,DeleteOutlined } from '@ant-design/icons';

export interface CouponDetailsWindowProps extends WindowProps {
    data?:CouponBitchData;
    onEdit?:(data:CouponBitchData)=>void;
}

const CouponBitchDetailsWindow=(props:CouponDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'couponBitch.data.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const bitchEnables =[
        {text:intl.formatMessage({id:'global.button.disable'}),value:'false'}, 
        {text:intl.formatMessage({id:'global.button.enable'}),value:'true'}
    ]

    const receiveMethods =[
        {text:intl.formatMessage({id:'couponBitch.data.receiveMethod.auto'}),value:'Auto'}, 
        {text:intl.formatMessage({id:'couponBitch.data.receiveMethod.active'}),value:'Active'}
    ]

    const couponTypes =[
        {text:intl.formatMessage({id:'couponBitch.data.couponType.cash'}),value:'Cash'}, 
        {text:intl.formatMessage({id:'couponBitch.data.couponType.discount'}),value:'Discount'},
        {text:intl.formatMessage({id:'couponBitch.data.couponType.exchange'}),value:'Exchange'}
    ]

    const onEditHandler=()=>{        
        props.onEdit!(data!)
    }

    let footerPanel = (
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Space>
                <Button onClick={()=>{onEditHandler()}}>{intl.formatMessage({id:'global.button.edit'})}</Button>
                <Popconfirm placement="topLeft" onConfirm={()=>{closeWindowHandler!(false)}} title={intl.formatMessage({id:'couponBitch.alert.delete.title'})}><Button icon={<DeleteOutlined />} type="primary" danger>{intl.formatMessage({id:'global.button.delete'})}</Button></Popconfirm>
            </Space>
            <Space>
                <Button icon={<UnorderedListOutlined />}>{intl.formatMessage({id:'couponBitch.button.list'})}</Button>
                <Button icon={<BlockOutlined />}>{intl.formatMessage({id:'couponBitch.button.issuance'})}</Button>
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
            <label>{intl.formatMessage({id:'couponBitch.data.property.name'})}：</label><span>{data.name}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.quantity'})}：</label><span>{data.quantity}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.denomination'})}：</label><span style={{color:'red'}}>${data.denomination}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.where'})}：</label><span>{data.where}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.receiveMethod'})}：</label><span>{receiveMethodPanel}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.couponType'})}：</label><span>{couponTypePanel}</span>
            </div>    
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.enabled'})}：</label><span>{enablePanel}</span>
            </div>  
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.receiveDate'})}：</label><span>{data.receiveDate[0]} - {data.receiveDate[1]}</span>
            </div>
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.expireDate'})}：</label><span>{data.expireDate[0]} - {data.expireDate[1]}</span>
            </div>  
            <div className="details-item">
            <label>{intl.formatMessage({id:'couponBitch.data.property.description'})}：</label><span>{data.description}</span>
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
export default CouponBitchDetailsWindow