import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getNsText } from "@/utils/stringUtils";
import { Alert, Badge,Form, Button, Input, Popconfirm, Space, Tag, DatePicker, InputNumber, Select, Checkbox, Segmented, AutoComplete, SelectProps } from "antd";
import { useIntl } from "umi";
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

export interface AdFormWindowProps extends WindowProps {
    data?:AdData;
    onSubmit?:(e:AdData)=>void
}


/**
 * Window - 广告表单
 * @param props 
 * @returns 
 */
const AdsFormWindow=(props:AdFormWindowProps)=>{
    const intl = useIntl()  
    const locale = intl.locale
    const {closeWindowHandler,data,...WindowProps} = props
    const [loading,setLoading]=useState<boolean>(true)
    const [slotses, setSlotses] = useState<AdslotsData[]>([]);
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data?intl.formatMessage({id:'ad.window.edit.title'}):intl.formatMessage({id:'ad.window.create.title'}),
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
            const {expire, ...pdata}=data            
            form.setFieldsValue({...pdata})
            form.setFieldValue('expire',moment(expire))
        }
        
    },[data])

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = () => {
        setLoading(true);
        fetch('/api/action/adslots',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "locale":locale
            },
            body:JSON.stringify({pagination:{current:1}})
        })
            .then((response) => response.json())
            .then((results ) => {
                setLoading(false);
                setSlotses(results.list)
                
            })
    }

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

    const onSelectSlotsHandler=(e:string)=>{
        var currentSlots = undefined
        for(var i=0;i<slotses.length;i++){
            if(e==String(slotses[i].id)){
                currentSlots = slotses[i]
                break
            }
        }
        if(currentSlots){
            form.setFieldValue('slotsCode',currentSlots.code)
            form.setFieldValue('slotsType',currentSlots.slotsType)
        }
    }

    const options = slotses.map((item:AdslotsData)=>({value:item.id,label:item.name + '['+item.code+']'})) 
    
    return(
        <Window {...windowProps} footer={footerPanel}>
            <div>
                <Form disabled={loading} form={form} {...formItemLayout} onFinish={onFinishHandler}>
                    <Form.Item
                        name="slotsId"
                        label={intl.formatMessage({id:'ad.data.property.slots'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'ad.form.slots.rules'}),
                            },
                        ]}
                        >
                        <Select options={options} onChange={onSelectSlotsHandler} />
                    </Form.Item>
                    <Form.Item
                        name="slotsCode"
                        label={intl.formatMessage({id:'ad.data.property.slotsCode'})}
                        >
                        <Input disabled />
                    </Form.Item>   
                    <Form.Item
                        name="slotsType"
                        label={intl.formatMessage({id:'global.data.property.type'})}
                        >                        
                        <Segmented disabled options={slotsTypeOptions} />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label={intl.formatMessage({id:'global.data.property.name'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'ad.form.title.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'ad.form.title.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label={intl.formatMessage({id:'ad.data.property.content'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'ad.form.content.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'ad.form.content.placeholder'})} />
                    </Form.Item>

                    <Form.Item
                        name="link"
                        label={intl.formatMessage({id:'global.data.property.link'})}
                        >
                        <Input placeholder={intl.formatMessage({id:'global.data.property.link'})} />
                    </Form.Item>
                    
                    <Form.Item
                        name="order"
                        label={intl.formatMessage({id:'global.data.property.order'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'ad.form.order.rules'}),
                            },
                        ]}
                        >
                        <InputNumber min={0} placeholder={intl.formatMessage({id:'ad.form.order.placeholder'})} />
                    </Form.Item> 

                    <Form.Item
                        name="expire"
                        label={intl.formatMessage({id:'global.data.property.expire'})}                      
                        >
                        <DatePicker showTime />
                    </Form.Item>                                                     
                </Form>
            </div>
        </Window>
    )
}

export default AdsFormWindow