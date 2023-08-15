import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge,Form, Button, Input, Popconfirm, Space, Tag, DatePicker, InputNumber, Select, Checkbox, Segmented } from "antd";
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
export interface DictionaryFormWindowProps extends WindowProps {
    data?:DictionaryData;
    onSubmit?:(e:DictionaryData)=>void
}

/**
 * Window - 字典表单
 * @param props 
 * @returns 
 */
const DictionaryFormWindow=(props:DictionaryFormWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data?intl.formatMessage({id:'dictionary.window.edit.title'}):intl.formatMessage({id:'dictionary.window.add.title'}),
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

    const dictionaryTyps = [
        {label:'String',value:'String'},
        {label:'Number',value:'Number'},
        {label:'Boolean',value:'Boolean'},
        {label:'Array',value:'Array'},
        {label:'Object',value:'Object'}
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
                              message: intl.formatMessage({id:'dictionary.form.name.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'dictionary.form.name.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label={intl.formatMessage({id:'dictionary.data.property.type'})}
                        >                        
                        <Segmented options={dictionaryTyps} />
                    </Form.Item>
                    <Form.Item
                        name="key"
                        label={intl.formatMessage({id:'global.data.property.key'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'dictionary.form.key.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'dictionary.form.key.placeholder'})} />
                    </Form.Item>   
                    <Form.Item
                        name="value"
                        label={intl.formatMessage({id:'global.data.property.value'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'dictionary.form.value.rules'}),
                            },
                        ]}
                        >
                        <TextArea maxLength={100} style={{ height: 120, resize: 'none' }}  placeholder={intl.formatMessage({id:'dictionary.form.value.placeholder'})}/>
                      
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

export default DictionaryFormWindow