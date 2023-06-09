import Container from "@/layouts/components/Container"
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
import { Divider, Tabs,  Space, Tag, Tooltip, DatePicker,Button,TablePaginationConfig,message, Checkbox } from "antd"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect} from "react"
import { useIntl } from "umi"
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { FileSearchOutlined,WechatFilled,AndroidFilled,AppleFilled,RobotFilled } from '@ant-design/icons';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import AppIcon from "@/components/AppIcon";
import DataGrid from "@/components/datagrid";
import { getTagColor } from "@/utils/stringUtils";
import AppButton from "@/components/button";
import styles from './index.less'
import ChangePasswordModal from "./components/ChangePasswordModal";
import ProfileFormWindow, { ProfileFormWindowProps } from "./components/ProfileFormWindow";

/**
 * Page - 个人资料
 * @returns 
 */
const ProfilePage=()=>{

    const intl = useIntl()
    const local = useIntl().locale
    const [data,setData] = useState<OperationData[]>()
    const [authoritys,setAuthoritys]=useState<any[]>()
    const [loading,setLoading] = useState(false)
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [openPasswordModal,setOpenPasswordModal]=useState<boolean>(false)
    const [windowOpen,setWindowOpen]=useState<boolean>(false)    
       
    const columns:ColumnsType<OperationData> = [
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
        },        
        {
            title:intl.formatMessage({id:'global.data.property.ip'}),
            dataIndex:'ip'
        },
        {
            title:intl.formatMessage({id:'global.data.property.type'}),
            dataIndex:'action',
            render:(value)=>{
                return(
                    <Tag key={value} color={getTagColor(value)}>{value}</Tag>
                )
            },
        },
        {
            title:intl.formatMessage({id:'operation.data.property.content'}),
            dataIndex:'content',
        },
        
        {
            title:intl.formatMessage({id:'global.data.property.terminal'}),
            dataIndex:'terminal',
            render:(value)=>{
                return(
                    <Tag key={value}>{value}</Tag>
                )
            }
        },
        {
            title:intl.formatMessage({id:'global.data.property.application'}),
            dataIndex:'appType',
            render:(value:Warden.AppType)=>{
                let icon = <RobotFilled style={{color:"#666666"}} />
                switch(value){
                    case "WEIXIN":
                        icon = <WechatFilled style={{color:"#666666"}} />
                        break
                    case "ANDROID":
                        icon = <AndroidFilled style={{color:"#666666"}} />
                        break
                    case "IOS":
                        icon = <AppleFilled style={{color:"#666666"}} />
                        break
                    case "WEB":
                        icon = <AppIcon name="chrome" color="#666666" size={14} />                        
                }
                return(
                    <Tooltip title={value}>
                        {icon}
                    </Tooltip>
                )
            }
        },
        {
            title:intl.formatMessage({id:'global.data.property.createDate'}),
            dataIndex:'createDate',
            width:'220px'
        }
    ]

    useEffect(()=>{
        fetchAuthoritysData()
    },[local])
    
    useEffect(() => {
        fetchLogsData();
    }, [JSON.stringify(tableParams),local]) 
   
    const fetchLogsData = () => {
        setLoading(true);
        fetch('/api/logs/operation',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "local":local
            },
            body:JSON.stringify(tableParams)
        })
            .then((response) => response.json())
            .then((results ) => {
                setData(results.list);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination:{
                        ...tableParams.pagination,
                        total:results.pagination.total
                    }
                })
            })
    }


    const fetchAuthoritysData = () => {
        setLoading(true);
        fetch('/api/data/authoritys',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "local":local
            }
        })
        .then((response) => response.json())
        .then((results ) => {
            
            setAuthoritys(results.list)
        })
    }


    // Table分页、排序、筛选事件
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<OperationData> | SorterResult<OperationData>[], extra: TableCurrentDataSource<OperationData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

    // datagrid属性
    const gridProps:DataGridProps = {
        columns,
        dataSource:data,
        rowKey:(record)=>record.id,
        pagination:tableParams.pagination,
        loading,
        disenableSelectCloumn:true,        
        onChange:onChangeHandler,
        size:'small'
    }    
    
    let authPanel:JSX.Element[] = []
    authoritys?.forEach((item,index)=>{        
        authPanel.push(
            <div key={'checkboxgroup-'+index}>
            <label>{item.label}</label><br />
            <Checkbox.Group disabled key={'checkbox-group-'+index} defaultValue={global.currentUser.authoritys} options={item.authoriths} />
            </div>
        )
    })

    const windowProps:ProfileFormWindowProps={
        open:windowOpen,
        closeWindowHandler:setWindowOpen,
        onSubmit:(e:Warden.SysUser)=>{
            console.log(e)
            setWindowOpen(false)
            message.success(intl.formatMessage({id:'profile.message.profile.success'}))
        }
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <div className={styles.box}>
                <div className={styles.boxLeft}>
                    <div className={styles.profileHead}>
                        <img src={global.currentUser.face} className={styles.face} /><br />
                        <label className={styles.uid}>{global.currentUser.uid}</label><br />
                        <label className={styles.id}>{global.currentUser.id}</label><br /><br />
                        <label>{global.currentUser.deptName} - {global.currentUser.postName} - <Tag>{global.currentUser.roleName}</Tag></label>
                        <Divider />
                        <dl>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.nickname'})}：</label><span>{global.currentUser.nickName}</span></dd>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.mobile'})}：</label><span>{global.currentUser.mobile}</span></dd>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.email'})}：</label><span>{global.currentUser.email}</span></dd>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.gender'})}</label><span>{global.currentUser.gender}</span></dd>  
                            <dd><label>{intl.formatMessage({id:'profile.data.property.birthday'})}</label><span>{global.currentUser.birthday}</span></dd>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.login.total'})}</label><span>{global.currentUser.loginTotal}</span></dd>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.login.ip'})}：</label><span>{global.currentUser.loginIp}</span></dd>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.login.time'})}：</label><span>{global.currentUser.loginDate.toDateString()}</span></dd>
                            <dd><label>{intl.formatMessage({id:'profile.data.property.createDate'})}：</label><span>{global.currentUser.createDate.toDateString()}</span></dd>
                        </dl>                        
                    </div>
                    <div>                                                  
                        <Button onClick={()=>{setOpenPasswordModal(true)}} style={{marginBottom:'10px'}} block>{intl.formatMessage({id:'profile.button.change.password'})}</Button>
                        <Button onClick={()=>{setWindowOpen(true)}} type="primary" block>{intl.formatMessage({id:'profile.button.modify.profile'})}</Button>
                        <ChangePasswordModal isOpen={openPasswordModal} setIsOpen={setOpenPasswordModal} />
                        <ProfileFormWindow {...windowProps} />
                    </div>
                </div>
                <div className={styles.boxRight}>
                    <Tabs type="card">                        
                        <Tabs.TabPane tab={intl.formatMessage({id:'profile.tab.title.authoritys'})} key="authoritys">
                            <div className={styles.authBox}>
                                {authPanel}
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={intl.formatMessage({id:'profile.tab.title.logs'})} key="logs" style={{padding:"0px"}}>
                            <DataGrid {...gridProps} />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </Container>
    )
}
export default ProfilePage