import DataGrid from '@/components/datagrid';
import Container from '@/layouts/components/Container';
import { WardenData } from '@/pages/typings';
import type { ColumnsType, } from 'antd/es/table';
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { useState,useEffect, useCallback } from 'react';
import { BarChartOutlined,WechatFilled,AndroidFilled,AppleFilled,RobotFilled } from '@ant-design/icons';
import { Button, message,Space,DatePicker,TablePaginationConfig, TableProps, Tag, Tooltip } from 'antd';
import { DataGridProps, DataGridToolbarProps } from '@/components/datagrid/typings';
import { useIntl } from 'umi';
import AppIcon from '@/components/AppIcon';
import VisitChartWindow,{VisitChartWindowProps} from './components/VisitChartWindow';

/**
 * Page - 访问统计
 * @returns 
 */
const { RangePicker } = DatePicker;
const VisitPage = () => {
    const intl = useIntl()
    const [data,setData] = useState<VisitData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen] = useState<boolean>(false)    
 
    const columns:ColumnsType<VisitData> = [
        {
            title:intl.formatMessage({id:'visit.data.property.uuid'}),
            dataIndex:'uuid',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'visit.data.property.account'}),
            dataIndex:'uid',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'global.data.property.ip'}),
            dataIndex:'ip'
        },
        {
            title:intl.formatMessage({id:'visit.data.property.visitContent'}),
            dataIndex:'page',
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
            filters:
            [
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
            title:intl.formatMessage({id:'visit.data.property.createDate'}),
            dataIndex:'time',
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
    }, [JSON.stringify(tableParams)]) 

    const fetchData = () => {
        setLoading(true);
        fetch('/api/report/visits',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<VisitData> | SorterResult<VisitData>[], extra: TableCurrentDataSource<VisitData>) =>{               
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
        rowKey:(record)=>record.uuid,
        pagination:tableParams.pagination,
        loading,
        onChange:onChangeHandler
    }

    const windowProps:VisitChartWindowProps={
        open:windowOpen,
        closeWindowHandler:setWindowOpen
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />
            <VisitChartWindow {...windowProps} />        
        </Container>
    )
}
export default VisitPage