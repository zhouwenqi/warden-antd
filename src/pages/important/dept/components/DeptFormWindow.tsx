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

export interface DeptFormWindowProps extends WindowProps {
    data?:DeptData;
    onSubmit?:(e:DeptData)=>void
}


/**
 * Window - 部门表单
 * @param props 
 * @returns 
 */
const DeptFormWindow=(props:DeptFormWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [loading,setLoading]=useState<boolean>(false)  
    const [treeData,setTreeData] = useState<any[]>()
    const [form] = Form.useForm();
    const windowProps:WindowProps = {
        width:650,
        title:data?intl.formatMessage({id:'dept.window.edit.title'}):intl.formatMessage({id:'dept.window.add.title'}),
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }
    useEffect(()=>{
        if(!props.open){
            return
        }
        form.resetFields()
        form.setFieldsValue(data)
    },[data])
    
    useEffect(()=>{
        fetchData()               
    },[])   

    const fetchData = () => {
        setLoading(true);
        fetch('/api/depts',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then((response) => response.json())
        .then((results ) => {
            const treeDatas = getTreeData(results.list)
            setTreeData(treeDatas)
            setLoading(false)
            
        })
    }

    useEffect(()=>{
        if(treeData){
            if(data && data.deptId)
            form.setFieldValue("deptId", data.deptId)
        }
    },[treeData])

    const getTreeData=(items:DeptData[])=>{
        let trees:any[] = []
        if(items == undefined || items.length <=0){
            return []
        }
        items.forEach((item,index)=>{
            let tree = {
                value:item.id,
                title:item.name,
                key:item.id,
                children:getTreeData(item.depts)
            }            
            trees.push(tree)
        })
        return trees
    }

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
                        label={intl.formatMessage({id:'dept.data.property.name'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'dept.form.name.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'dept.form.name.placeholder'})} />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label={intl.formatMessage({id:'dept.data.property.code'})}
                        rules={[
                            {
                              required: true,
                              message: intl.formatMessage({id:'dept.form.code.rules'}),
                            },
                        ]}
                        >
                        <Input placeholder={intl.formatMessage({id:'dept.form.code.placeholder'})} />
                    </Form.Item>
                   
                    <Form.Item
                        name="deptId"
                        label={intl.formatMessage({id:'dept.data.property.parent'})}
                        >
                        <TreeSelect treeData={treeData} treeLine={{showLeafIcon:true}} />
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

export default DeptFormWindow