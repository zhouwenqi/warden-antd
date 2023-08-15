import Container from "@/layouts/components/Container"
import { Button, Checkbox, Form, Input, InputNumber, Select, Slider, Space, Switch, Upload,message } from "antd"
import type { SliderMarks } from 'antd/es/slider';
import { useEffect, useState } from "react"
import { useIntl } from "umi"
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons'
import styles from './index.less'

const {TextArea} = Input

const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 8 },
      sm: { span: 8 },
    },
}

const formButtonLayout = {
    wrapperCol: {
        xs: {offset:8, span: 8 },
        sm: {offset:8, span: 8 },
    },
}

const ConfigPage=()=>{
    const [form] = Form.useForm()
    const [loading,setLoading] = useState(false)
    const intl = useIntl()
    const locale = intl.locale

    const fetchData = () => {
        setLoading(true);
        fetch('/api/global/config',{
            method:'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                locale
            }
        })
        .then((response) => response.json())
        .then((results ) => {  
            setLoading(false)    
            form.setFieldsValue(results)            
        })
    }

    useEffect(()=>{
        fetchData()
    },[locale])

    const channelOptions=[
        {label:intl.formatMessage({id:'config.option.channel.sms'}),value:'Sms'},
        {label:intl.formatMessage({id:'config.option.channel.app'}),value:'App'},
        {label:intl.formatMessage({id:'config.option.channel.website'}),value:'Website'},
        {label:intl.formatMessage({id:'config.option.channel.system'}),value:'System'}
    ]

    const levelMarks:SliderMarks={
        0:{label:intl.formatMessage({id:'config.option.safe.level.low'})},
        30:{label:intl.formatMessage({id:'config.option.safe.level.middle'})},
        60:{label:intl.formatMessage({id:'config.option.safe.level.tall'})},
        90:{label:intl.formatMessage({id:'config.option.safe.level.super'})}
    }
 
    const serverUrlAfter=(
        <Form.Item name="serverAfter" noStyle>                                
            <Select options={[{label:'http://',value:'http://'},{label:'https://',value:'https://'}]}></Select>
        </Form.Item>
    )

    const onFinishHandler=(values:any)=>{
        console.log(values)
        message.success(intl.formatMessage({id:'config.message.modify.success'}))
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <div className={styles.box}>
                <div className={styles.formBox}>
                    <Form form={form} {...formItemLayout} onFinish={onFinishHandler}>
                        <Form.Item {...formButtonLayout}>                                                              
                            <span className={styles.formTitle}>{intl.formatMessage({id:'config.form.title'})}</span><br />  
                            <span className={styles.formMemo}>{intl.formatMessage({id:'config.form.memo'})}</span>                            
                        </Form.Item>  
                        <Form.Item
                            name="appName"
                            label={intl.formatMessage({id:'config.data.property.appName'})}
                            rules={[
                                {
                                required: true,
                                message: intl.formatMessage({id:'config.form.appName.rules'}),
                                },
                            ]}
                            >                                
                            <Input placeholder={intl.formatMessage({id:'config.form.appName.placeholder'})} />
                        </Form.Item>
                        <Form.Item
                            name="domain"
                            label={intl.formatMessage({id:'config.data.property.domain'})}                           
                            rules={[
                                {
                                required: true,
                                message: intl.formatMessage({id:'config.form.domain.rules'}),
                                },
                            ]}
                            >                                
                            <Input placeholder={intl.formatMessage({id:'config.form.domain.placeholder'})} />
                        </Form.Item>
                        <Form.Item
                            name="serverUrl"
                            label={intl.formatMessage({id:'config.data.property.serverUrl'})}
                            rules={[
                                {
                                required: true,
                                message: intl.formatMessage({id:'config.form.serverUrl.rules'}),
                                },
                            ]}
                            >                                
                            <Input addonBefore={serverUrlAfter} placeholder={intl.formatMessage({id:'config.form.serverUrl.placeholder'})} />
                        </Form.Item>
                        <Form.Item
                            name="appIcon"
                            label={intl.formatMessage({id:'config.data.property.appIcon'})}                         
                            >                                
                            <Upload listType="picture-card"  accept="image/png, image/jpeg" maxCount={1} showUploadList={false}>
                                <UploadOutlined />
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="isVerifyCode"
                            valuePropName="checked"
                            label={intl.formatMessage({id:'config.data.property.verifyCode'})}
                            >                                
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="appDisable"
                            valuePropName="checked"
                            label={intl.formatMessage({id:'config.data.property.appDisable'})}
                            >                                
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="loginFaildLimit"
                            label={intl.formatMessage({id:'config.data.property.login.faild.limit'})}
                            tooltip={intl.formatMessage({id:'config.tooltip.login.faild.limit'})}
                            >                                
                            <InputNumber min={1} max={10} />
                        </Form.Item>
                        <Form.Item
                            name="messageChannel"
                            label={intl.formatMessage({id:'config.data.property.msg.channel'})}
                            >                                
                            <Checkbox.Group options={channelOptions} />
                        </Form.Item>
                        <Form.Item
                            name="safeLevel"
                            label={intl.formatMessage({id:'config.data.property.safe.level'})}
                            >                                
                            <Slider min={0} max={90} step={30} marks={levelMarks} />
                        </Form.Item>
                        <Form.Item
                            name="appDescription"
                            label={intl.formatMessage({id:'config.data.property.appDescription'})}
                            >                                
                            <TextArea style={{height:"140px"}} />
                        </Form.Item>   
                        <Form.Item {...formButtonLayout}> 
                            <Space>                               
                                <Button type="primary" htmlType="submit">{intl.formatMessage({id:'global.button.save'})}</Button>
                                <Button htmlType="reset">{intl.formatMessage({id:'global.button.reset'})}</Button>
                            </Space>
                        </Form.Item>                       
                    </Form>                    
                    
                </div>
            </div>
        </Container>
    )
}
export default ConfigPage