import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { Avatar, Badge, Button, Divider, Popconfirm, Space, Tag } from "antd";
import { useIntl } from "umi";
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

export interface UserDetailsWindowProps extends WindowProps {
    data?:UserData;
    onEdit?:(data:UserData)=>void
}

/**
 * Window - 用户详情
 * @param props 
 * @returns 
 */
const UserDetailsWindow = (props:UserDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'user.window.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    let footerPanel = (
        <Space>
            <Button icon={<EditOutlined />} onClick={()=>{props.onEdit!(data!)}}>{intl.formatMessage({id:'global.button.edit'})}</Button>
            <Popconfirm placement="topLeft" onConfirm={()=>{closeWindowHandler!(false)}} title={intl.formatMessage({id:'global.button.tooltip.delete'})}><Button icon={<DeleteOutlined />} type="primary" danger>{intl.formatMessage({id:'global.button.delete'})}</Button></Popconfirm>
        </Space>
    )

    

    let panel = <></>    
    if(data){        
        let genderValue = "未知"
        switch(data.gender){
            case "Male":
                genderValue = "男"
                break
            case "Female":
                genderValue = "女"
                break
        }
        const roleTags:JSX.Element[]=[]
        data.roleName?.forEach((item,index)=>{
            roleTags.push(
                <Tag key={'r'+index}>{item}</Tag>
            )
        })
        const enablePanel = data.enabled ? <Badge status="success" text="启用" /> : <Badge status="default" text="禁用" />
        panel = (<div data-warden-details="box">            
        <div className="details-item">
           <label>{intl.formatMessage({id:'user.data.property.face'})}：</label><span><Avatar size="large" src={data.face} /></span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'profile.data.property.uid'})}：</label><span>{data.uid}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'profile.data.property.nickname'})}：</label><span>{data.nickName}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'profile.data.property.email'})}：</label><span>{data.email}</span>
        </div>  
        <div className="details-item">
           <label>{intl.formatMessage({id:'profile.data.property.mobile'})}：</label><span>{data.mobile}</span>
        </div>  
        <div className="details-item">
           <label>{intl.formatMessage({id:'profile.data.property.gender'})}：</label><span>{genderValue}</span>
        </div> 
        <div className="details-item">
           <label>{intl.formatMessage({id:'profile.data.property.birthday'})}：</label><span>{data.birthday}</span>
        </div>   
        <div className="details-item">
           <label>{intl.formatMessage({id:'user.data.property.dept'})}：</label><span>{data.deptName}</span>
        </div>  
        <div className="details-item">
           <label>{intl.formatMessage({id:'user.data.property.post'})}：</label><span>{data.postName}</span>
        </div>   
        <div className="details-item">
           <label>{intl.formatMessage({id:'user.data.property.role'})}：</label><span><Space>{roleTags}</Space></span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.status'})}：</label><span>{enablePanel}</span>
        </div>
        <Divider />
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.createDate'})}：</label><span>{data.createDate}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.modifyDate'})}：</label><span>{data.modifyDate}</span>
        </div>
        </div>)
    }
    return(
        <Window {...windowProps} footer={footerPanel}>
            {panel}
        </Window>
    )
}
export default UserDetailsWindow