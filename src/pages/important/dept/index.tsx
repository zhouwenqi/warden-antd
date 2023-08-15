import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect } from "react"
import { history, useIntl } from "umi"
import { Space, Tag, Badge, DatePicker,Button,TablePaginationConfig,message,Form, Select, Popconfirm, Tooltip, Divider, Empty } from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { PlusOutlined,FileSearchOutlined,DeleteOutlined,FormOutlined,LinkOutlined } from '@ant-design/icons';
import DataGrid from "@/components/datagrid";
import { getNsText, getTagColor } from "@/utils/stringUtils";
import AppButton from "@/components/button";
import DeptDetailsWindow, { DeptDetailsWindowProps } from "./components/DeptDetailsWindow";
import DeptFormWindow, { DeptFormWindowProps } from "./components/DeptFormWindow";
const { RangePicker } = DatePicker;

/**
 * Page - 部门
 * @returns 
 */
const DeptPage=()=>{
    const intl = useIntl()
    const locale = useIntl().locale
    const [data,setData] = useState<DeptData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<DeptData>()
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<DeptData>()



    const columns:ColumnsType<DeptData> = [ 
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
            width:'70px',
            sorter:true           
        },       
        
        {
            title:intl.formatMessage({id:'dept.data.property.code'}),
            dataIndex:'code',
            width:'200px',
            sorter:true           
        },  
        {
            title:intl.formatMessage({id:'dept.data.property.name'}),
            dataIndex:'name', 
            render:(value,record)=>{
                const pl = record.deptId! > 0 ? '│  ' : ''
                return(
                    pl + value
                )
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
        fetch('/api/depts',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<DeptData> | SorterResult<DeptData>[], extra: TableCurrentDataSource<DeptData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary" onClick={()=>{onClickCreateHandler()}} icon={<PlusOutlined />} key="addBtn">{intl.formatMessage({id:'dept.button.add'})}</Button>        
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
            {label:intl.formatMessage({id:'global.data.property.name'}), value:'name'},
            {label:intl.formatMessage({id:'dept.data.property.code'}), value:'code'},
            {label:intl.formatMessage({id:'global.data.property.description'}), value:'description'},
        ], 
               
    }

    const onClickCreateHandler=()=>{
        setFormWindowData(undefined)
        setFormWindowOpen(true)
    }

    const onClickEditHandler=(e:DeptData)=>{
        setFormWindowData(e);
        setFormWindowOpen(true)
    }

    const onSubmitHandler=(e:DeptData)=>{
        const key = 'deptSubmit'
        message.loading({ content: intl.formatMessage({id:'global.message.submitting'}), key })
        setTimeout(() => {
            message.success({ content: intl.formatMessage({id:'global.message.commit'}), key, duration: 2 })
            setFormWindowOpen(false)
        }, 1000)

    }

    const expandedRowRender=(record:DeptData):JSX.Element=>{        
        const expandGridProps:DataGridProps = {
            columns,
            dataSource:record.depts,            
            rowKey:(record:DeptData)=>record.id,
            pagination:false,
            showHeader:false,
        }
        const dataGrid = record.depts && record.depts.length>0 ? <DataGrid {...expandGridProps} /> : <Empty  image={Empty.PRESENTED_IMAGE_SIMPLE} />
        return(
            <>{dataGrid}</>
            
        )
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
        expandable:{expandedRowRender,defaultExpandedRowKeys:['0']}
        
    }
    const windowDetailsrops:DeptDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        onEdit:onClickEditHandler,
        closeWindowHandler:setWindowOpen
    }

    const windowFormProps:DeptFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />  
            <DeptDetailsWindow {...windowDetailsrops} />
            <DeptFormWindow {...windowFormProps} />
        </Container>
    )
}

export default DeptPage