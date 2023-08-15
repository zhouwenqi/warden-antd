import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons'
import { Alert, Badge,Form, Button, Input, Popconfirm, Space, Tag, DatePicker, Upload, Select, Checkbox, Segmented, AutoComplete, SelectProps, TreeSelect, Switch } from "antd";
import { useIntl } from "umi";
import { useEffect, useState } from "react";
import moment from 'moment';

const {TextArea} = Input

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

export interface RoleFormWindowProps extends WindowProps {
    data?:RoleData;
    onSubmit?:(e:RoleData)=>void
}


/**
 * Window - 角色表单
 * @param props 
 * @returns 
 */
const RoleFormWindow=(props:RoleFormWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data?intl.formatMessage({id:'role.window.edit.title'}):intl.formatMessage({id:'role.window.add.title'}),
        onClose:()=>{closeWindowHandler!(false)},
        destroyOnClose:true,
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
            form.setFieldsValue(data)
        }
    },[data])
    
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
                        label={intl.formatMessage({id:'role.data.property.name'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'role.form.name.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'role.form.name.placeholder'})} />
                    </Form.Item>                    
                    <Form.Item
                        name="value"
                        label={intl.formatMessage({id:'role.data.property.value'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'role.form.value.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'role.form.value.placeholder'})} />
                    </Form.Item> 
                    <Form.Item
                        name="description"
                        label={intl.formatMessage({id:'global.data.property.description'})}                 
                        >
                        <TextArea style={{height:"140px"}} />
                    </Form.Item>                                                                                
                </Form>
            </div>
        </Window>
    )
}

export default RoleFormWindow