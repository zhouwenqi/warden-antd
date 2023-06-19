import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { Checkbox, Badge, Button, Divider, Popconfirm, Space, Tag } from "antd";
import { useIntl } from "umi";
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

export interface RoleAuthorityWindowProps extends WindowProps {
    data?:RoleData;
    onSubmit?:(data:RoleData)=>void
}

/**
 * Window - 角色权限
 * @param props 
 * @returns 
 */
const RoleAuthorityWindow = (props:RoleAuthorityWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    const [authoritys,setAuthoritys]=useState<any[]>()    
    const [loading,setLoading] = useState(false)
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'role.window.authoritys.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    useEffect(()=>{
        fetchAuthoritysData()
    },[data])

    const fetchAuthoritysData = () => {
        setLoading(true);
        fetch('/api/data/authoritys',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "local":intl.locale
            }
        })
        .then((response) => response.json())
        .then((results ) => {            
            setAuthoritys(results.list)
        })
    }

    let footerPanel = (
        <Space>
            <Button onClick={()=>{closeWindowHandler!(false);props.onSubmit!(data!)}} type="primary">{intl.formatMessage({id:'global.button.save'})}</Button> 
        </Space>
    )

    let authPanel:JSX.Element[] = []
    if(data){
        authoritys?.forEach((item,index)=>{        
            authPanel.push(
                <div key={'checkboxgroup-'+index} style={{margin:"20px 0px"}}>
                    <label style={{color:"#999"}}>{item.label}</label><br />
                    <Checkbox.Group key={'checkbox-group-'+index} defaultValue={data.authoritys} options={item.authoriths} />
                </div>
            )
        })
    }
    

    return(
        <Window {...windowProps} footer={footerPanel}>
            <div style={{padding:"0px 20px"}}>
                <div><span><Tag color="blue">{data?.name}</Tag></span></div>
                {authPanel}
            </div>            
        </Window>
    )
}
export default RoleAuthorityWindow