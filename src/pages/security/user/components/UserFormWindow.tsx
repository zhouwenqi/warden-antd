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

export interface UserFormWindowProps extends WindowProps {
    data?:UserData;
    onSubmit?:(e:UserData)=>void
}


/**
 * Window - 用户表单
 * @param props 
 * @returns 
 */
const UserFormWindow=(props:UserFormWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data?intl.formatMessage({id:'user.window.edit.title'}):intl.formatMessage({id:'user.window.add.title'}),
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

    form.resetFields()
    useEffect(()=>{        
        if(data){     
            form.setFieldsValue(data)       
            form.setFieldValue('birthday',moment(data.birthday))
        }
    },[data])
    let footerPanel = (        
        <Space>
            <Button onClick={()=>{closeWindowHandler!(false)}}>{intl.formatMessage({id:'global.button.cancel'})}</Button>
            <Button onClick={onSubmitHandler} type="primary">{intl.formatMessage({id:'global.button.save'})}</Button>         
        </Space>
    )

    const genderOptions = [{label:'男',value:'Male'},{label:'女',value:'Female'},{label:'未知',value:'Unknow'}]
    const statusPanel = data ? (<Form.Item
        name="enabled"
        valuePropName="checked"
        label={intl.formatMessage({id:'global.button.enable'})}
        >
        <Switch />
    </Form.Item>) : undefined

    return(
        <Window {...windowProps} footer={footerPanel}>
            <div>
                <Form form={form} {...formItemLayout} onFinish={onFinishHandler}>                    
                    <Form.Item
                        name="uid"
                        label={intl.formatMessage({id:'profile.data.property.uid'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.form.uid.rules'}),
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>                    
                    <Form.Item
                        name="nickName"
                        label={intl.formatMessage({id:'profile.data.property.nickname'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.form.nickName.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'profile.data.property.nickname'})} />
                    </Form.Item>
                    <Form.Item
                        name="mobile"
                        label={intl.formatMessage({id:'profile.data.property.mobile'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.form.mobile.rules'}),
                            },
                        ]}                 
                        >
                        <Input placeholder={intl.formatMessage({id:'profile.data.property.mobile'})} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={intl.formatMessage({id:'profile.data.property.email'})}    
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.form.email.rules'}),
                            },
                        ]}                     
                        >
                        <Input placeholder={intl.formatMessage({id:'profile.data.property.email'})} />
                    </Form.Item>  
                    <Form.Item
                        name="gender"
                        label={intl.formatMessage({id:'profile.data.property.gender'})}
                        >
                        <Select options={genderOptions} />
                    </Form.Item>
                    <Form.Item
                        name="deptName"
                        label={intl.formatMessage({id:'user.data.property.dept'})}
                        >
                        <Select />
                    </Form.Item>      
                    <Form.Item
                        name="postName"
                        label={intl.formatMessage({id:'user.data.property.post'})}
                        >
                        <Select />
                    </Form.Item>     
                    <Form.Item
                        name="roleName"
                        label={intl.formatMessage({id:'user.data.property.role'})}
                        >
                        <Select mode="multiple" />
                    </Form.Item>    
                    <Form.Item
                        name="birthday"
                        label={intl.formatMessage({id:'profile.data.property.birthday'})}
                        >
                        <DatePicker format={'YYYY/MM/DD'} showTime />
                    </Form.Item>    
                    {statusPanel}     
                    <Form.Item
                        name="face"
                        label={intl.formatMessage({id:'user.data.property.face'})}
                        >                                
                        <Upload listType="picture-card"  accept="image/png, image/jpeg" maxCount={1} showUploadList={false}>
                            <UploadOutlined />
                        </Upload>
                    </Form.Item>                                                             
                </Form>
            </div>
        </Window>
    )
}

export default UserFormWindow