import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect } from "react"
import { history, useIntl } from "umi"
import { Space, Tag, Badge, DatePicker,Button,TablePaginationConfig,message,Form, Select, Popconfirm, Tooltip, Divider, Empty, Avatar } from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { PlusOutlined,FileSearchOutlined,DeleteOutlined,FormOutlined,LinkOutlined } from '@ant-design/icons';
import DataGrid from "@/components/datagrid";
import { getNsText, getTagColor } from "@/utils/stringUtils";
import AppButton from "@/components/button";
import UserDetailsWindow, { UserDetailsWindowProps } from "./components/UserDetailsWindow";
import UserFormWindow, { UserFormWindowProps } from "./components/UserFormWindow";
const { RangePicker } = DatePicker;

/**
 * Page - 用户
 * @returns 
 */
const UserPage=()=>{
    const intl = useIntl()
    const locale = useIntl().locale
    const [data,setData] = useState<UserData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<UserData>()
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<UserData>()

    const userEnables =[
        {text:intl.formatMessage({id:'global.button.disable'}),value:'false'}, 
        {text:intl.formatMessage({id:'global.button.enable'}),value:'true'}
    ]

    const columns:ColumnsType<UserData> = [        
        {
            title:intl.formatMessage({id:'profile.data.property.uid'}),
            dataIndex:'uid',
            width:'140px',      
        },      
        
        {
            title:intl.formatMessage({id:'profile.data.property.nickname'}),
            dataIndex:'nickName',
            width:'200px',    
            render:(value,record)=>{
                return(
                    <Space>
                        <Avatar src={record.face} />
                        <label>{value}</label>
                    </Space>
                )
            }                
        },  
        {
            title:intl.formatMessage({id:'profile.data.property.mobile'}),
            dataIndex:'mobile',
            sorter:true
        },  
        {
            title:intl.formatMessage({id:'user.data.property.dept'}),
            dataIndex:'deptName',
            sorter:true
        },  
        {
            title:intl.formatMessage({id:'user.data.property.post'}),
            dataIndex:'postName',
        },  
        {
            title:intl.formatMessage({id:'global.data.property.status'}),
            dataIndex:'enabled',
            filters:userEnables,
            render:(value)=>{
                const badge = value ? <Badge status="success" text="启用" /> : <Badge status="default" text="禁用" />
                return badge
            }
        }, 
           
        {
            title:intl.formatMessage({id:'global.data.property.createDate'}),
            dataIndex:'createDate',
            sorter:true,
            width:'220px',
            filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (               
                <div style={{padding:'20px'}}>                    
                    <Space.Compact>
                        <RangePicker onChange={(timer,timerstring)=>{onChangePickerHandler(timerstring)}} />
                        <Button type="primary" onClick={()=>{onFilterTimeHandler(setSelectedKeys,confirm)}}>{intl.formatMessage({id:'global.button.ok'})}</Button>
                    </Space.Compact>
                </div>
            )
        },
        {
            title:intl.formatMessage({id:'global.data.property.action'}),
            width:'100px',
            dataIndex:'actions',
            render:(value:any,record:any)=>{
                return(
                    <Space>
                        <AppButton tooltip={intl.formatMessage({id:'global.button.tooltip.details'})} onClick={()=>{onClickDetailsHandler(record)}}><FileSearchOutlined /></AppButton>                        
                        <Popconfirm placement="topLeft" onConfirm={()=>{onClickDetailsHandler(record)}} title={intl.formatMessage({id:'global.button.tooltip.delete'})}><AppButton><DeleteOutlined /></AppButton></Popconfirm>
                        <AppButton onClick={()=>{onClickEditHandler(record)}}><FormOutlined /></AppButton>
                    </Space>
                )
            }
        }
    ]

 

    const onClickDetailsHandler=(record:any)=>{        
        setWindowData(record) 
        setWindowOpen(true)       
    }

    const onChangePickerHandler=(timeArr:string[])=>{
        let timerstring:(string[] | undefined) = timeArr
        if(timeArr[0] =='' || timeArr[1] == ''){
            timerstring = undefined
        }
        setTimers(timerstring)
    }

    const onFilterTimeHandler=(setSelectedKeys:(keys:React.Key[])=>void,confirm:(param?: FilterConfirmProps) => void)=>{        
        setSelectedKeys(timers ? timers : [])
        confirm()
    }
    
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]) 
   
    const fetchData = () => {
        setLoading(true);
        fetch('/api/users',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
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

    // Table分页、排序、筛选事件
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<UserData> | SorterResult<UserData>[], extra: TableCurrentDataSource<UserData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary" onClick={()=>{onClickCreateHandler()}} icon={<PlusOutlined />} key="addBtn">{intl.formatMessage({id:'user.button.create'})}</Button>        
    ]

    // 表格工具栏属性
    const toolBarProps:DataGridToolbarProps = {
        onRefresh:()=>{
            fetchData()
        },
        onExport:()=>{
            const key = 'updatable';
            message.loading({ content: intl.formatMessage({id:'datagrid.toolbar.message.export.loading'}), key });
            setTimeout(() => {
                message.success({ content: intl.formatMessage({id:'datagrid.toolbar.message.export.success'}), key, duration: 2 });
            }, 1000);
        },
        onDelete:(keys:React.Key[])=>{
            console.log(keys)
        },
        leftButtons:toolbarButtons,        
    }
   
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        searchPropertyItems:[            
            {label:intl.formatMessage({id:'profile.data.property.uid'}), value:'uid'},
            {label:intl.formatMessage({id:'profile.data.property.nickname'}), value:'nickName'},
            {label:intl.formatMessage({id:'profile.data.property.mobile'}), value:'mobile'},
        ], 
        filterFormItems:[
            <Select key="user.dept" style={{width:"120px"}} placeholder={intl.formatMessage({id:'user.data.property.dept'})} />,
            <Select key="user.post" style={{width:"120px"}} placeholder={intl.formatMessage({id:'user.data.property.post'})} />,
            <Select key="user.role" style={{width:"120px"}} placeholder={intl.formatMessage({id:'user.data.property.role'})} />
        ]
               
    }

    const onClickCreateHandler=()=>{
        setFormWindowData(undefined)
        setFormWindowOpen(true)
    }

    const onClickEditHandler=(e:UserData)=>{
        setFormWindowData(e);
        setFormWindowOpen(true)
    }

    const onSubmitHandler=(e:UserData)=>{
        const key = 'userSubmit'
        message.loading({ content: intl.formatMessage({id:'global.message.submitting'}), key })
        setTimeout(() => {
            message.success({ content: intl.formatMessage({id:'global.message.commit'}), key, duration: 2 })
            setFormWindowOpen(false)
        }, 1000)

    }

    // datagrid属性
    const gridProps:DataGridProps = {
        toolBarProps,
        searchBarProps,
        columns,
        dataSource:data,
        rowKey:(record)=>record.id,
        pagination:tableParams.pagination,
        loading,   
        onChange:onChangeHandler,
        
    }
    const windowDetailsrops:UserDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        onEdit:onClickEditHandler,
        closeWindowHandler:setWindowOpen
    }

    const windowFormProps:UserFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />  
            <UserDetailsWindow {...windowDetailsrops} />
            <UserFormWindow {...windowFormProps} />
        </Container>
    )
}
export default UserPage