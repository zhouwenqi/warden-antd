import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge,Form, Button, Input, Popconfirm, Space, Tag, DatePicker, InputNumber, Select, Checkbox } from "antd";
import { useIntl } from "umi";
import { UnorderedListOutlined,BlockOutlined,DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
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


export interface ProfileFormWindowProps extends WindowProps {  
    onSubmit?:(e:Warden.SysUser)=>void
}

/**
 * Window - 个人资料表单
 * @param props 
 * @returns 
 */
const ProfileFormWindow=(props:ProfileFormWindowProps)=>{
    const intl = useIntl()  
    
    const {closeWindowHandler,...WindowProps} = props
    const [data,setData]=useState<Warden.SysUser>(global.currentUser)
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'profile.window.title'}),        
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
        if(!props.open) {
            return
        }
        if(data){     
            form.setFieldsValue(data)       
            form.setFieldValue('birthday',moment(data.birthday))
        }
    },[data])

    const genderOptions = intl.locale=='en-US' ? [{label:'Male',value:'Male'},{label:'Female',value:'Female'},{label:'Unknow',value:'Unknow'}] : [{label:'男',value:'男'},{label:'女',value:'女'},{label:'未知',value:'未知'}]

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
                        name="nickName"
                        label={intl.formatMessage({id:'profile.data.property.nickname'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'profile.window.rules.nickName'}),
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
                              message: intl.formatMessage({id:'profile.window.rules.mobile'}),
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
                              message: intl.formatMessage({id:'profile.window.rules.email'}),
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
                        name="birthday"
                        label={intl.formatMessage({id:'profile.data.property.birthday'})}
                        >
                        <DatePicker format={'YYYY/MM/DD'} showTime />
                    </Form.Item>                                                      
                </Form>
            </div>
        </Window>
    )
}

export default ProfileFormWindow