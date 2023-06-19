import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect } from "react"
import { history, useIntl } from "umi"
import { Space, Tag, Badge, DatePicker,Button,TablePaginationConfig,message,Form, Select, Popconfirm, Tooltip, Divider } from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { PlusOutlined,FileSearchOutlined,DeleteOutlined,FormOutlined,LinkOutlined } from '@ant-design/icons';
import DataGrid from "@/components/datagrid";
import { getNsText, getTagColor } from "@/utils/stringUtils";
import AppButton from "@/components/button";
import AdDetailsWindow, { AdDetailsWindowProps } from "./components/AdDetailsWindow";
import AdFormWindow, { AdFormWindowProps } from "./components/AdFormWindow";

const { RangePicker } = DatePicker;
/**
 * Page - 广告
 * @returns 
 */
const AdsPage=()=>{
    const intl = useIntl()
    const locale = useIntl().locale
    const [data,setData] = useState<AdData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<AdData>()
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<AdData>()

    const slotsTypeOptions = [
        {text:intl.formatMessage({id:'adslots.data.option.type.image'}),value:'Image'},
        {text:intl.formatMessage({id:'adslots.data.option.type.video'}),value:'Video'},
        {text:intl.formatMessage({id:'adslots.data.option.type.text'}),value:'Text'},
    ]
    
    const terminalOptions = [
        {lalbel:"PC",value:"PC"},
        {lalbel:"MAC",value:"MAC"},
        {lalbel:"SERVER",value:"SERVER"},
        {lalbel:"MOBILE",value:"MOBILE"},
        {lalbel:"OTHER",value:"OTHER"}
    ]

    const applicationOptions = [
        {lalbel:"ANDROID",value:"ANDROID"},
        {lalbel:"IOS",value:"IOS"},
        {lalbel:"WEIXIN",value:"WEIXIN"},
        {lalbel:"WEB",value:"WEB"},
        {lalbel:"OTHER",value:"OTHER"}
    ]

    const columns:ColumnsType<AdData> = [        
        {
            title:intl.formatMessage({id:'global.data.property.title'}),
            dataIndex:'title',
            sorter:true,
            render:(value,record)=>{
                return(
                    <a href={record.link} target="_blank">{value}</a>
                )
            }
        },
        {
            title:intl.formatMessage({id:'ad.data.property.content'}),
            dataIndex:'content',
            render:(value,record)=>{
                return(
                    <a href={record.link} target="_blank"><img src={value} style={{width:"80px"}} /></a>
                )
            }
        },
        {
            title:intl.formatMessage({id:'ad.data.property.slotsCode'}),
            dataIndex:'slotsCode',
            sorter:true           
        },
        {
            title:intl.formatMessage({id:'ad.data.property.clickSum'}),
            dataIndex:'clickSum',
        },
        {
            title:intl.formatMessage({id:'global.data.property.order'}),
            dataIndex:'order'
        },
        {
            title:intl.formatMessage({id:'global.data.property.expire'}),
            dataIndex:'expire'
        },   
        {
            title:intl.formatMessage({id:'global.data.property.type'}),
            dataIndex:'slotsType',
            filters:slotsTypeOptions,
            render:(value)=>{
                return(
                    getNsText(slotsTypeOptions,value)
                )
            },
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
            width:'140px',
            render:(value:any,record:any)=>{
                return(
                    <Space>
                        <AppButton tooltip={intl.formatMessage({id:'global.button.tooltip.details'})} onClick={()=>{onClickDetailsHandler(record)}}><FileSearchOutlined /></AppButton>
                        <AppButton onClick={()=>{history.push(record.link)}}><LinkOutlined /></AppButton>
                        <Divider type="vertical" />
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
    }, [JSON.stringify(tableParams),locale]) 
   
    const fetchData = () => {
        setLoading(true);
        fetch('/api/action/ads',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<AdData> | SorterResult<AdData>[], extra: TableCurrentDataSource<AdData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary" onClick={()=>{onClickCreateHandler()}} icon={<PlusOutlined />} key="addBtn">{intl.formatMessage({id:'ad.button.add'})}</Button>        
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
            {label:intl.formatMessage({id:'ad.data.property.slotsCode'}), value:'code'},
            {label:intl.formatMessage({id:'global.data.property.title'}), value:'title'}    
        ],
        filterFormItems:[
            <Form.Item name="terminal" noStyle key="terminal">
                <Select allowClear options={terminalOptions} placeholder={intl.formatMessage({id:'global.placeholder.select.terminal'})} />
            </Form.Item>,
            <Form.Item name="appType" noStyle key="appType">
                <Select allowClear options={applicationOptions} placeholder={intl.formatMessage({id:'global.placeholder.select.application'})} />
            </Form.Item>                           
        ], 
               
    }

    const onClickCreateHandler=()=>{
        setFormWindowData(undefined)
        setFormWindowOpen(true)
    }

    const onClickEditHandler=(e:AdData)=>{
        setFormWindowData(e);
        setFormWindowOpen(true)
    }

    const onSubmitHandler=(e:AdData)=>{
        const key = 'adSubmit'
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
        size:"small",
        onChange:onChangeHandler,
        footer:()=>{
            return(
                <div>{intl.formatMessage({id:'global.data.footer.tag'})} : {tableParams.pagination?.total}</div>
            )
        }
    }
    const windowDetailsrops:AdDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        onEdit:onClickEditHandler,
        closeWindowHandler:setWindowOpen
    }

    const windowFormProps:AdFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />  
            <AdDetailsWindow {...windowDetailsrops} />
            <AdFormWindow {...windowFormProps} />
        </Container>
    )
}
export default AdsPage