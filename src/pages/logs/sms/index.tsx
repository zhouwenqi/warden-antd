import Container from "@/layouts/components/Container"
import type { ColumnsType, } from 'antd/es/table';
import { WardenData } from '@/pages/typings';
import { useState,useEffect } from "react"
import { useIntl } from "umi"
import { Space, Tag, Tooltip, DatePicker,Button,TablePaginationConfig,message,Form, Select } from "antd";
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { BarChartOutlined,WechatFilled,AndroidFilled,AppleFilled,RobotFilled } from '@ant-design/icons';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import AppIcon from "@/components/AppIcon";
import DataGrid from "@/components/datagrid";
import SmsTypeChartWindow,{SmsTypeChartWindowProps} from "./components/SmsTypeChartWindow";

const { RangePicker } = DatePicker;

/**
 * Page - 短信日志
 * @returns 
 */
const SmsPage=()=>{
    const intl = useIntl()
    const local = useIntl().locale
    const [data,setData] = useState<SmsData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen] = useState<boolean>(false)
 
    const columns:ColumnsType<SmsData> = [
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'sms.data.property.template.sn'}),
            dataIndex:'templateSn',
        },
        {
            title:intl.formatMessage({id:'sms.data.property.mobile'}),
            dataIndex:'mobile',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'sms.data.property.sms.type'}),
            dataIndex:'smsType',
        },
        {
            title:intl.formatMessage({id:'sms.data.property.sms.content'}),
            dataIndex:'smsContent',
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
            title:intl.formatMessage({id:'sms.data.property.send.time'}),
            dataIndex:'sendTime',
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
        fetch('/api/logs/sms',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<SmsData> | SorterResult<SmsData>[], extra: TableCurrentDataSource<SmsData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

    // 表格工具栏button
    const toolbarButtons = [    
        <Button onClick={()=>{setWindowOpen(true)}} icon={<BarChartOutlined />} key="chartsBtn">{intl.formatMessage({id:'sms.data.button.chart.analysis'})}</Button>        
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
   
    // 查询按钮事件
    const onSearchHandler=(params:any)=>{
        console.log(params)
    }


    const filterOptions = intl.locale == 'en-US' ? [{label:'Verification',value:'verification'},{label:'Promotion',value:'promotion'},{label:'Remind',value:'remind'}] : [{label:'验证码',value:'verification'},{label:'营销推广',value:'promotion'},{label:'通知提醒',value:'remind'}]
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        resetButtonShow:true,        
        searchPropertyItems:[
            {label:intl.formatMessage({id:'sms.data.property.mobile'}), value:'account'},
            {label:intl.formatMessage({id:'sms.data.property.template.sn'}), value:'templateSn'},
            {label:intl.formatMessage({id:'sms.data.property.sms.content'}),value:'smsContent'}
        ],
        filterFormItems:[
            <Form.Item name="smsType" noStyle key="smsType">
                <Select allowClear options={filterOptions} placeholder={intl.formatMessage({id:'sms.data.filter.placeholder.type'})} />
            </Form.Item>            
        ],
        onSearch:onSearchHandler
                       
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
        onChange:onChangeHandler
    }

    const smsTypeChartWindowProps:SmsTypeChartWindowProps = {
        open:windowOpen,
        closeWindowHandler:setWindowOpen
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />        
            <SmsTypeChartWindow {...smsTypeChartWindowProps} />
        </Container>
    )
}

export default SmsPage