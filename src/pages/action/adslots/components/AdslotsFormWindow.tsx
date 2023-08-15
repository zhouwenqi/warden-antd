import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import {  Form, Button, Input,  Space, InputNumber,  Checkbox, Segmented } from "antd";
import { useIntl } from "umi";
import { useEffect } from "react";

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
export interface AdslotsFormWindowProps extends WindowProps {
    data?:AdslotsData;
    onSubmit?:(e:AdslotsData)=>void
}

/**
 * Window - 广告位表单
 * @param props 
 * @returns 
 */
const AdslotsFormWindow=(props:AdslotsFormWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data?intl.formatMessage({id:'adslots.window.edit.title'}):intl.formatMessage({id:'adslots.window.create.title'}),
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const onSubmitHandler=()=>{
        form.submit()
    }

    const onFinishHandler=(values:any)=>{
        props.onSubmit!(values!)
    }

    useEffect(()=>{
        if(!props.open){
            return
        }
        form.resetFields()
        if(data){            
            form.setFieldsValue({...data})
        }
    },[data]) 

    const slotsTypeOptions = [
        {label:intl.formatMessage({id:'adslots.data.option.type.image'}),value:'Image'},
        {label:intl.formatMessage({id:'adslots.data.option.type.video'}),value:'Video'},
        {label:intl.formatMessage({id:'adslots.data.option.type.text'}),value:'Text'},
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
                              message: intl.formatMessage({id:'adslots.form.name.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'adslots.form.name.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label={intl.formatMessage({id:'adslots.data.property.code'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'adslots.form.code.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'adslots.form.code.placeholder'})} />
                    </Form.Item>   
                    <Form.Item
                        name="quantity"
                        label={intl.formatMessage({id:'global.data.property.quantity'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'adslots.form.quantity.rules'}),
                            },
                        ]}
                        >
                        <InputNumber placeholder={intl.formatMessage({id:'adslots.form.quantity.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="width"
                        label={intl.formatMessage({id:'global.data.property.width'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'adslots.form.width.rules'}),
                            },
                        ]}
                        >
                        <InputNumber min={1} placeholder={intl.formatMessage({id:'adslots.form.width.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="height"
                        label={intl.formatMessage({id:'global.data.property.height'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'adslots.form.height.rules'}),
                            },
                        ]}
                        >
                        <InputNumber min={1} placeholder={intl.formatMessage({id:'adslots.form.height.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="slotsType"
                        label={intl.formatMessage({id:'global.data.property.type'})}
                        >                        
                        <Segmented options={slotsTypeOptions} />
                    </Form.Item>
                    <Form.Item
                        name="enabled"
                        label={intl.formatMessage({id:'global.data.property.enable'})}
                        valuePropName="checked"
                        >
                        <Checkbox />
                    </Form.Item>                     
                    <Form.Item
                        name="description"
                        label={intl.formatMessage({id:'global.data.property.description'})}                        
                        >
                        <TextArea maxLength={100} style={{ height: 120, resize: 'none' }} />
                    </Form.Item>                                                       
                </Form>
            </div>
        </Window>
    )
}

export default AdslotsFormWindow