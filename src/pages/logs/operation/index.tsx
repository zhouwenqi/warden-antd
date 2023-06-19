import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect} from "react"
import { useIntl } from "umi"
import { Space, Tag, Tooltip, DatePicker,Button,TablePaginationConfig,message} from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { FileSearchOutlined,WechatFilled,AndroidFilled,AppleFilled,RobotFilled } from '@ant-design/icons';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import AppIcon from "@/components/AppIcon";
import DataGrid from "@/components/datagrid";
import { getTagColor } from "@/utils/stringUtils";
import AppButton from "@/components/button";
import OperationDetailsWindow,{OperationDetailsWindowProps} from "./components/OperationDetailsWindow";

const { RangePicker } = DatePicker;


/**
 * Page - 操作日志
 * @returns 
 */
const OperationPage=()=>{
   
    const intl = useIntl()
    const locale = useIntl().locale
    const [data,setData] = useState<OperationData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<OperationData>()
       
    const columns:ColumnsType<OperationData> = [
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'operation.data.property.account'}),
            dataIndex:'name',
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
            title:intl.formatMessage({id:'global.data.property.application'}),
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
            render:(value:any,record:any)=>{
                return(
                    <Space>
                        <AppButton tooltip={intl.formatMessage({id:'global.button.tooltip.details'})} onClick={()=>{onClickDetailsHandler(record)}}><FileSearchOutlined /></AppButton>
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
        fetch('/api/logs/operation',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<OperationData> | SorterResult<OperationData>[], extra: TableCurrentDataSource<OperationData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

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
        }
    }
   
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        searchPropertyItems:[
            {label:intl.formatMessage({id:'operation.data.property.account'}), value:'account'},
            {label:intl.formatMessage({id:'global.data.property.content'}), value:'content'},
            {label:intl.formatMessage({id:'global.data.property.ip'}),value:'ip'}
        ]
               
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
        disenableSelectCloumn:true,        
        onChange:onChangeHandler,
        footer:()=>{
            return(
                <div>{intl.formatMessage({id:'global.data.footer.tag'})} : {tableParams.pagination?.total}</div>
            )
        }
    }
    const windowProps:OperationDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        closeWindowHandler:setWindowOpen
    }
   

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />  
            <OperationDetailsWindow {...windowProps} />
        </Container>
    )
}

export default OperationPage