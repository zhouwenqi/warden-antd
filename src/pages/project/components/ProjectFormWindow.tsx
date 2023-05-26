import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { Button, Form, Input, Space,Upload } from "antd"
import { PlusOutlined,FileImageOutlined } from '@ant-design/icons'
import { useIntl } from "umi"
import { useEffect, useState } from "react"

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

const { TextArea } = Input;

export interface ProjectFormWindowProps extends WindowProps {
    data?:ProjectData,
    onSubmit?:(e:ProjectData)=>void
}

/**
 * 项目表单窗口
 * @param props 
 * @returns 
 */
const ProjectFormWindow=(props:ProjectFormWindowProps)=>{
    const intl = useIntl()
    const [form] = Form.useForm();
    const {closeWindowHandler,data,...WindowProps} = props
    useEffect(()=>{
        form.resetFields()
        form.setFieldsValue({...data})      
    },[data])

    const windowProps:WindowProps = {
        width:650,
        title:data ? intl.formatMessage({id:'project.tooltip.edit'}) : intl.formatMessage({id:'project.tooltip.create'}) ,
        onClose:()=>{closeWindowHandler!(false)},
        destroyOnClose:true,
        ...WindowProps
    }

    const onSubmitHandler=()=>{
        form.submit()
    }

    const onFinishHandler=(values:any)=>{
        console.log(values)
        props.onSubmit!(values!)
    }

    const footerPanel = (<Space><Button onClick={()=>{closeWindowHandler!(false)}}>{intl.formatMessage({id:'global.button.cancel'})}</Button><Button onClick={onSubmitHandler} type="primary">{intl.formatMessage({id:'global.button.save'})}</Button></Space>)
    return(
        <Window {...windowProps} footer={footerPanel}>
            <div>
                <Form form={form} {...formItemLayout} onFinish={onFinishHandler}>
                    <Form.Item
                        name="icon"
                        label={intl.formatMessage({id:'project.data.property.icon'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'project.form.icon.rules'}),
                            },
                        ]}
                        >
                        <Upload accept="image/png, image/jpeg" maxCount={1} action="/upload.do" listType="picture-card">
                            {data?<div>
                                <img src={data?.icon} style={{width:"60px"}} />
                                <br />
                                <PlusOutlined />
                            </div>:<PlusOutlined />} 
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label={intl.formatMessage({id:'global.data.property.name'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'project.form.name.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'project.form.name.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label={intl.formatMessage({id:'project.data.property.code'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'project.form.code.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'project.form.code.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label={intl.formatMessage({id:'global.data.property.description'})}                      
                        >
                        <TextArea rows={4} placeholder={intl.formatMessage({id:'project.form.description.placeholder'})} />
                    </Form.Item>
                </Form>
            </div>
        </Window>
    )
}

export default ProjectFormWindow