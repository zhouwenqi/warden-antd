import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect } from "react"
import { useIntl } from "umi"
import { Space, Tag, Badge, DatePicker,Button,TablePaginationConfig,message,Form, Select, Popconfirm, Tooltip, Divider } from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { PlusOutlined,FileSearchOutlined,DeleteOutlined,FormOutlined } from '@ant-design/icons';
import DataGrid from "@/components/datagrid";
import { getNsText, getTagColor } from "@/utils/stringUtils";
import AppButton from "@/components/button";
import DictionaryFormWindow, { DictionaryFormWindowProps } from "./components/DictionaryFormWindow";

const { RangePicker } = DatePicker;

const DictionaryPage=()=>{
    const intl = useIntl()
    const locale = useIntl().locale
    const [data,setData] = useState<DictionaryData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})

    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<DictionaryData>()

    const dictionaryTyps = [
        {text:'String',value:'String'},
        {text:'Number',value:'Number'},
        {text:'Boolean',value:'Boolean'},
        {text:'Array',value:'Array'},
        {text:'Object',value:'Object'}
    ]

    const columns:ColumnsType<DictionaryData> = [        
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'global.data.property.name'}),
            dataIndex:'name',
            render:(value,record)=>{
                return(
                    <a onClick={()=>{onClickEditHandler(record)}}>{value}</a>
                )
            }
        },
        {
            title:intl.formatMessage({id:'global.data.property.key'}),
            dataIndex:'key'
        },
        {
            title:intl.formatMessage({id:'global.data.property.value'}),
            dataIndex:'value'
        },
        {
            title:intl.formatMessage({id:'dictionary.data.property.type'}),
            dataIndex:'type',
            sorter:true,
            filters:dictionaryTyps,
            render:(value)=>{
                return(<Tag>{value}</Tag>)
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
                        <Popconfirm placement="topLeft" title={intl.formatMessage({id:'global.button.tooltip.delete'})}><AppButton><DeleteOutlined /></AppButton></Popconfirm>
                        <AppButton onClick={()=>{onClickEditHandler(record)}}><FormOutlined /></AppButton>
                    </Space>
                )
            }
        }
    ]

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
    }, [JSON.stringify(tableParams),locale]) 
   
    const fetchData = () => {
        setLoading(true);
        fetch('/api/dictionarys',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                locale
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<DictionaryData> | SorterResult<DictionaryData>[], extra: TableCurrentDataSource<DictionaryData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary" onClick={()=>{onClickCreateHandler()}} icon={<PlusOutlined />} key="addBtn">{intl.formatMessage({id:'dictionary.button.add'})}</Button>        
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
            {label:intl.formatMessage({id:'global.data.property.key'}), value:'key'},
            {label:intl.formatMessage({id:'global.data.property.value'}), value:'value'}            
        ],
               
    }

    const onClickCreateHandler=()=>{
        setFormWindowData(undefined)
        setFormWindowOpen(true)
    }

    const onClickEditHandler=(e:DictionaryData)=>{
        setFormWindowData(e);
        setFormWindowOpen(true)
    }

    const onSubmitHandler=(e:DictionaryData)=>{
        const key = 'adslotsSubmit'
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
        footer:()=>{
            return(
                <div>{intl.formatMessage({id:'global.data.footer.tag'})} : {tableParams.pagination?.total}</div>
            )
        }
    }

    const windowFormProps:DictionaryFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }
   
    

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />  
            <DictionaryFormWindow {...windowFormProps}  />
        </Container>
    )
}
export default DictionaryPage