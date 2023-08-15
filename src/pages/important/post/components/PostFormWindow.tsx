import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge,Form, Button, Input, Popconfirm, Space, Tag, DatePicker, InputNumber, Select, Checkbox, Segmented, AutoComplete, SelectProps, TreeSelect } from "antd";
import { useIntl } from "umi";
import { useEffect, useState } from "react";

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

export interface PostFormWindowProps extends WindowProps {
    data?:PostData;
    onSubmit?:(e:PostData)=>void
}


/**
 * Window - 岗位表单
 * @param props 
 * @returns 
 */
const PostFormWindow=(props:PostFormWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data?intl.formatMessage({id:'post.window.edit.title'}):intl.formatMessage({id:'post.window.add.title'}),
        onClose:()=>{closeWindowHandler!(false)},
        destroyOnClose:true,
        ...WindowProps
    }
    useEffect(()=>{
        if(!props.open){
            return
        }
        form.resetFields()
        form.setFieldsValue(data)
    },[data])

    const onSubmitHandler=()=>{
        form.submit()
    }

    const onFinishHandler=(values:any)=>{      
        props.onSubmit!(values!)
    }    

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
                        label={intl.formatMessage({id:'post.data.property.name'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'post.form.name.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'post.form.name.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label={intl.formatMessage({id:'post.data.property.code'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'post.form.code.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'post.form.code.placeholder'})} />
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

export default PostFormWindow