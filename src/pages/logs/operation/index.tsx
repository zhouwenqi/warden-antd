import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect } from "react"
import { useIntl } from "umi"
import { Space, Tag, Tooltip, DatePicker,Button,TablePaginationConfig,message } from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { BarChartOutlined,WechatFilled,AndroidFilled,AppleFilled,RobotFilled } from '@ant-design/icons';
import { DataGridProps, DataGridToolbarProps } from '@/components/datagrid/typings';
import AppIcon from "@/components/AppIcon";
import DataGrid from "@/components/datagrid";

const { RangePicker } = DatePicker;

/**
 * Page - 操作日志
 * @returns 
 */
const OperationPage=()=>{
   
    const intl = useIntl()
    const local = useIntl().locale
    const [data,setData] = useState<OperationData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen] = useState(Boolean)
 
    const columns:ColumnsType<OperationData> = [
        {
            title:intl.formatMessage({id:'operation.data.property.id'}),
            dataIndex:'id',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'operation.data.property.account'}),
            dataIndex:'name',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'operation.data.property.ip'}),
            dataIndex:'ip'
        },
        {
            title:intl.formatMessage({id:'operation.data.property.action'}),
            dataIndex:'action',
        },
        {
            title:intl.formatMessage({id:'operation.data.property.content'}),
            dataIndex:'content',
        },
        
        {
            title:intl.formatMessage({id:'operation.data.property.terminal'}),
            dataIndex:'terminal',
            sorter:true,
            render:(value)=>{
                return(
                    <Tag key={value}>{value}</Tag>
                )
            },
            filters:[
                {text:"PC",value:"PC"},
                {text:"MAC",value:"MAC"},
                {text:"SERVER",value:"SERVER"},
                {text:"MOBILE",value:"MOBILE"},
                {text:"OTHER",value:"OTHER"}
            ]
        },
        {
            title:intl.formatMessage({id:'operation.data.property.application'}),
            dataIndex:'appType',
            sorter:true,
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
            },
            filters:[
                {text:"ANDROID",value:"ANDROID"},
                {text:"IOS",value:"IOS"},
                {text:"WEIXIN",value:"WEIXIN"},
                {text:"WEB",value:"WEB"},
                {text:"OTHER",value:"OTHER"}
            ]
        },
        {
            title:intl.formatMessage({id:'operation.data.property.createDate'}),
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
    }, [JSON.stringify(tableParams),local]) 



   
    const fetchData = () => {
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

    // Table分页、排序、筛选事件
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<OperationData> | SorterResult<OperationData>[], extra: TableCurrentDataSource<OperationData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

    // 表格工具栏button
    const toolbarButtons = [    
        <Button onClick={()=>{setWindowOpen(true)}} icon={<BarChartOutlined />} key="chartsBtn">{intl.formatMessage({id:'visit.data.button.chart.analysis'})}</Button>        
    ]

    // 表格工具栏属性
    const toolBarProps:DataGridToolbarProps = {
        leftButtons:toolbarButtons,
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
        }
    }

    // 查询面版属性
    const searchBarProps:SearchBoxProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary'        
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
        onChange:onChangeHandler
    }
    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />            
        </Container>
    )
}

export default OperationPage