import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Form, Button, Input, Popconfirm, Space, Tag, Tooltip, InputNumber, Select, Checkbox, Segmented } from "antd";
import { useIntl } from "umi";
import { UnorderedListOutlined,BlockOutlined,DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { SegmentedValue } from "antd/lib/segmented";


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
}

export interface CouponIssuanceWindowProps extends WindowProps {
    data?:CouponBatchData;
    onSubmit?:(e:IssuanceData)=>void
}

/**
 * Window - 发行优惠券
 * @param props 
 * @returns 
 */
const CouponIssuanceWindow=(props:CouponIssuanceWindowProps)=>{
    const intl = useIntl()  
    const [accStatus,setAccStatus]=useState<boolean>(true)
    const {closeWindowHandler,data,...WindowProps} = props
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data ? data!.name : intl.formatMessage({id:'couponBatch.button.issuance'}),
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }
    
    useEffect(()=>{
        form.resetFields()        
    },[data]) 

    const onSubmitHandler=()=>{
        form.submit()
    }

    const onFinishHandler=(values:any)=>{    
        const issuanceData:IssuanceData = {...values}
        if(data){
            issuanceData.batchId = data?.id
        }
        props.onSubmit!(issuanceData)
        form.resetFields()
    }

    let footerPanel = (
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Space>
                <Button onClick={onSubmitHandler} type="primary" icon={<BlockOutlined />}>{intl.formatMessage({id:'global.button.issuance'})}</Button>
            </Space>
        </div>
    )
    let panel = <></>

    const methodOpstions=[
        {label:intl.formatMessage({id:'couponIssuance.data.option.method.standard'}),value:'standard'},
        {label:intl.formatMessage({id:'couponIssuance.data.option.method.directional'}),value:'directional'}
    ]

    const onMethodChangeHandler=(value:SegmentedValue)=>{
        setAccStatus(value==='standard')
    }

    if(data){
        const options = [
            {label:"ZhangMaoqi",value:"ZhangMaoqi"},
            {label:"Xunsum2",value:"Xunsum2"},
            {label:"HuangGangmo",value:"HuangGangmo"},
            {label:"Qingxuehang",value:"Qingxuehang"},
            {label:"MeiHengdong",value:"MeiHengdong"},
            {label:"ChaoChagomu",value:"ChaoChagomu"},
            {label:"DuangShanping",value:"DuangShanping"},
            {label:"XiaoXiaoqian",value:"XiaoXiaoqian"},
            {label:"PingHunxun",value:"PingHunxun"},
            {label:"MoKangheng",value:"MoKangheng"}
        ]
        panel = (<div data-warden-details="box">                       
            <Form form={form} {...formItemLayout} onFinish={onFinishHandler}>
                <Form.Item
                    name="issuanceMethod"
                    label={intl.formatMessage({id:'couponIssuance.data.property.quantity'})}                   
                    >
                    <Segmented onChange={onMethodChangeHandler} options={methodOpstions} defaultValue={methodOpstions[0].value} />
                </Form.Item>  
                <Form.Item
                    name="quantity"
                    label={intl.formatMessage({id:'couponIssuance.data.property.quantity'})}
                    rules={[
                        {
                          required: true,
                          message: intl.formatMessage({id:'couponBatch.form.quantity.rules'}),
                        },
                    ]}>
                    <InputNumber min={1} max={99999} placeholder={accStatus ? intl.formatMessage({id:'couponIssuance.data.property.quantity'}) : intl.formatMessage({id:'couponIssuance.form.account.quantity.placeholder'})} />
                </Form.Item>                
                <Form.Item
                    name="smsNotification"
                    label={intl.formatMessage({id:'couponIssuance.data.property.sms'})}
                    >
                    <Checkbox defaultChecked={true} />
                </Form.Item>
                <Form.Item
                    name="generatingCode"
                    label={intl.formatMessage({id:'couponIssuance.data.property.generating'})}
                    >
                    <Checkbox defaultChecked={true} />
                </Form.Item>
                <Form.Item            
                    name="accounts"
                    label={intl.formatMessage({id:'couponIssuance.data.property.specift'})}
                    >
                    <Select disabled={accStatus} options={options} mode="multiple" optionLabelProp="label" />
                </Form.Item>
            </Form>           
        </div>)
    }

    return(
        <Window {...windowProps} footer={footerPanel}>
            {panel}
        </Window>
    )
}
export default CouponIssuanceWindow