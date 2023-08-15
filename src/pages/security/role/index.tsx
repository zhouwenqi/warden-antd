import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect } from "react"
import { history, useIntl } from "umi"
import { Space, Tag, Badge, DatePicker,Button,TablePaginationConfig,message,Form, Select, Popconfirm, Tooltip, Divider, Empty } from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { PlusOutlined,FileSearchOutlined,DeleteOutlined,FormOutlined,OneToOneOutlined } from '@ant-design/icons';
import DataGrid from "@/components/datagrid";
import { getNsText, getTagColor } from "@/utils/stringUtils";
import AppButton from "@/components/button";
import RoleDetailsWindow, { RoleDetailsWindowProps } from "./components/RoleDetailsWindow";
import RoleFormWindow, { RoleFormWindowProps } from "./components/RoleFormWindow";
import RoleAuthorityWindow, { RoleAuthorityWindowProps } from "./components/RoleAuthorityWindow";
const { RangePicker } = DatePicker;

/**
 * Page - 角色
 * @returns 
 */
const RolePage=()=>{
    const intl = useIntl()
    const locale = useIntl().locale
    const [data,setData] = useState<RoleData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<RoleData>()
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<RoleData>()
    const [authorityWindowOpen,setAuthorityWindowOpen]=useState<boolean>(false)
    const [authorityWindowData,setAuthorityWindowData]=useState<RoleData>()

    const columns:ColumnsType<RoleData> = [ 
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
            width:'70px',
            sorter:true           
        },       
        
        {
            title:intl.formatMessage({id:'role.data.property.name'}),
            dataIndex:'name',
            width:'240px',
            sorter:true           
        },  
        {
            title:intl.formatMessage({id:'role.data.property.value'}),
            dataIndex:'value',
            sorter:true
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
                        <AppButton tooltip={intl.formatMessage({id:'role.button.authroitys'})} onClick={()=>{onClickSetupHandler(record)}}><OneToOneOutlined /></AppButton>
                        <Divider type="vertical" />
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
        fetch('/api/roles',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<RoleData> | SorterResult<RoleData>[], extra: TableCurrentDataSource<RoleData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary" onClick={()=>{onClickCreateHandler()}} icon={<PlusOutlined />} key="addBtn">{intl.formatMessage({id:'role.button.create'})}</Button>        
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
        leftButtons:toolbarButtons
    }
   
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        searchPropertyItems:[            
            {label:intl.formatMessage({id:'role.data.property.name'}), value:'name'},
            {label:intl.formatMessage({id:'role.data.property.value'}), value:'value'},
            {label:intl.formatMessage({id:'global.data.property.description'}), value:'description'},
        ], 
               
    }

    const onClickCreateHandler=()=>{
        setFormWindowData(undefined)
        setFormWindowOpen(true)
    }

    const onClickEditHandler=(e:RoleData)=>{
        setFormWindowData(e)
        setFormWindowOpen(true)
    }

    const onClickSetupHandler=(e:RoleData)=>{
        setAuthorityWindowData(e)
        setAuthorityWindowOpen(true)
    }

    const onSubmitHandler=(e:RoleData)=>{
        const key = 'postSubmit'
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
    const windowDetailsrops:RoleDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        onEdit:onClickEditHandler,
        closeWindowHandler:setWindowOpen
    }

    const windowFormProps:RoleFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }
    const windowAuthroityProps:RoleAuthorityWindowProps = {
        open:authorityWindowOpen,
        data:authorityWindowData,
        onSubmit:()=>{message.success(intl.formatMessage({id:'role.message.setup.authoritys.success'}))},
        closeWindowHandler:setAuthorityWindowOpen
    }


    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />  
            <RoleDetailsWindow {...windowDetailsrops} />
            <RoleFormWindow {...windowFormProps} />
            <RoleAuthorityWindow {...windowAuthroityProps} />
        </Container>
    )
}
export default RolePage