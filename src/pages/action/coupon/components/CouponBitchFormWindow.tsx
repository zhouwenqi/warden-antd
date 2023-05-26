import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge,Form, Button, Input, Popconfirm, Space, Tag, DatePicker, InputNumber, Select, Checkbox } from "antd";
import { useIntl } from "umi";
import { UnorderedListOutlined,BlockOutlined,DeleteOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import moment from 'moment';

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

const { TextArea } = Input
const { RangePicker } = DatePicker

export interface CouponBitchFormWindowProps extends WindowProps {
    data?:CouponBitchData;
    onSubmit?:(e:CouponBitchData)=>void
}
const CouponBitchFormWindow=(props:CouponBitchFormWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'couponBitch.data.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const onSubmitHandler=()=>{
        form.submit()
    }

    const onFinishHandler=(values:any)=>{
        console.log(values)
        props.onSubmit!(values!)
    }

    useEffect(()=>{
        form.resetFields()
        if(data){            
            const {receiveDate,expireDate,...pdata} = data
            form.setFieldsValue({...pdata})
            form.setFieldValue('receiveDate',[moment(receiveDate[0]),moment(receiveDate[1])])
            form.setFieldValue('expireDate',[moment(expireDate[0]),moment(expireDate[1])])
        }
    },[data]) 

    const receiveMethods =[
        {label:intl.formatMessage({id:'couponBitch.data.receiveMethod.auto'}),value:'Auto'}, 
        {label:intl.formatMessage({id:'couponBitch.data.receiveMethod.active'}),value:'Active'}
    ]

    const couponTypes =[
        {label:intl.formatMessage({id:'couponBitch.data.couponType.cash'}),value:'Cash'}, 
        {label:intl.formatMessage({id:'couponBitch.data.couponType.discount'}),value:'Discount'},
        {label:intl.formatMessage({id:'couponBitch.data.couponType.exchange'}),value:'Exchange'}
    ]

    let footerPanel = (        
        <Space>
            <Button onClick={()=>{closeWindowHandler!(false)}}>{intl.formatMessage({id:'global.button.cancel'})}</Button>
            <Button onClick={onSubmitHandler} type="primary">{intl.formatMessage({id:'global.button.save'})}</Button>         
        </Space>
    )

    return(
        <Window {...windowProps} footer={footerPanel}>
            <div>
                <Form form={form} {...formItemLayout} onFinish={onFinishHandler}>
                    <Form.Item
                        name="name"
                        label={intl.formatMessage({id:'global.data.property.name'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'couponBitch.form.name.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'couponBitch.form.name.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="denomination"
                        label={intl.formatMessage({id:'couponBitch.data.property.denomination'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'couponBitch.form.denomination.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'couponBitch.form.denomination.placeholder'})} />
                    </Form.Item>   
                    <Form.Item
                        name="quantity"
                        label={intl.formatMessage({id:'couponBitch.data.property.quantity'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'couponBitch.form.quantity.rules'}),
                            },
                        ]}
                        >
                        <InputNumber placeholder={intl.formatMessage({id:'couponBitch.form.quantity.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="where"
                        label={intl.formatMessage({id:'couponBitch.data.property.where'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'couponBitch.form.where.rules'}),
                            },
                        ]}
                        >
                        <InputNumber placeholder={intl.formatMessage({id:'couponBitch.form.where.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="receiveMethod"
                        label={intl.formatMessage({id:'couponBitch.data.property.receiveMethod'})}
                        >
                        <Select options={receiveMethods} />
                    </Form.Item>
                    <Form.Item
                        name="couponType"
                        label={intl.formatMessage({id:'couponBitch.data.property.couponType'})}
                        >
                        <Select options={couponTypes} />
                    </Form.Item>
                    <Form.Item
                        name="enabled"
                        label={intl.formatMessage({id:'couponBitch.data.property.enabled'})}
                        valuePropName="checked"
                        >
                        <Checkbox />
                    </Form.Item>
                    <Form.Item
                        name="receiveDate"
                        label={intl.formatMessage({id:'couponBitch.data.property.receiveDate'})}
                        >
                        <RangePicker format={'YYYY/MM/DD HH:mm:ss'} showTime />
                    </Form.Item>  
                    <Form.Item
                        name="expireDate"
                        label={intl.formatMessage({id:'couponBitch.data.property.expireDate'})}
                        >
                        <RangePicker format={'YYYY/MM/DD HH:mm:ss'} showTime />
                    </Form.Item>   
                    <Form.Item
                        name="description"
                        label={intl.formatMessage({id:'couponBitch.data.property.description'})}                        
                        >
                        <TextArea maxLength={100} style={{ height: 120, resize: 'none' }} />
                    </Form.Item>                                                       
                </Form>
            </div>
        </Window>
    )
}

export default CouponBitchFormWindow