import DataGrid from '@/components/datagrid';
import Container from '@/layouts/components/Container';
import { WardenData } from '@/pages/typings';
import type { ColumnsType, } from 'antd/es/table';
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { useState,useEffect, useCallback } from 'react';
import { WechatFilled,AlipayOutlined,AppleFilled } from '@ant-design/icons';
import { Button, message,Space,DatePicker,TablePaginationConfig, Tooltip, Badge, Form, Select, InputNumber, Input, Popconfirm } from 'antd';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { useIntl } from 'umi';
import AppIcon from '@/components/AppIcon';
import { getNs, getNsText } from '@/utils/stringUtils';
import OrderDetailsWindow, { OrderDetailsWindowProps } from './components/OrderDetailsWindow';
import AppButton from '@/components/button';

const OrderPage=()=>{
    const { RangePicker } = DatePicker;
    const intl = useIntl()
    const [data,setData] = useState<OrderData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [prices,setPrices] = useState<number[]>([])
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<OrderData>()  
 
    const orderStatuss =[
        {text:intl.formatMessage({id:'order.data.order.status.unaudited'}),value:'Unaudited'}, 
        {text:intl.formatMessage({id:'order.data.order.status.audited'}),value:'Audited'}, 
        {text:intl.formatMessage({id:'order.data.order.status.cancel'}),value:'Cancel'}, 
        {text:intl.formatMessage({id:'order.data.order.status.completed'}),value:'Completed'}, 
    ]

    const paymentStatuss =[
        {text:intl.formatMessage({id:'order.data.payment.status.notpaid'}),value:'Notpaid'}, 
        {text:intl.formatMessage({id:'order.data.payment.status.paid'}),value:'Paid'}
    ]

    const paymentTypes =[
        {text:intl.formatMessage({id:'order.data.payment.type.weixin'}),value:'Weixin'}, 
        {text:intl.formatMessage({id:'order.data.payment.type.alipay'}),value:'Alipay'},
        {text:intl.formatMessage({id:'order.data.payment.type.applepay'}),value:'Applepay'}
    ]

    const columns:ColumnsType<OrderData> = [
        {
            title:intl.formatMessage({id:'order.data.property.sn'}),
            dataIndex:'sn',
            sorter:true,
            render:(value:any,record:any)=>{
                return(<a onClick={()=>{onClickDetailsHandler(record)}}>{value}</a>)
            }
        },
        {
            title:intl.formatMessage({id:'order.data.property.account'}),
            dataIndex:'account',
        },
        {
            title:intl.formatMessage({id:'order.data.property.price'}),
            dataIndex:'price',
            render:(value)=>{
                return(
                    '$ ' + value
                )
            },
            filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (               
                <div style={{padding:'20px'}}>                    
                    <Space.Compact>
                        <InputNumber defaultValue={prices[0]} />
                        <Input
                            style={{
                            width: 30,
                            borderRight: 0,
                            pointerEvents: 'none',
                            }}
                            placeholder="~"
                            disabled
                        />
                        <InputNumber defaultValue={prices[1]} />
                        <Button type="primary" onClick={()=>{onFilterPriceHandler(setSelectedKeys,confirm)}}>{intl.formatMessage({id:'global.button.ok'})}</Button>
                    </Space.Compact>
                </div>
            )
        },
        {
            title:intl.formatMessage({id:'order.data.property.orderStatus'}),
            dataIndex:'orderStatus',
            filters:orderStatuss,
            render:(value)=>{
                let badge = <Badge status="default" />                
                switch(value){
                    case "Completed":
                        badge = <Badge status="success" />
                        break
                    case "Audited":
                        badge = <Badge status="processing" />
                        break
                    case "Unaudited":
                        badge = <Badge status="warning" />
                        break
                }
                return(
                    <Space>
                        {badge} {getNsText(orderStatuss,value)}
                    </Space>
                )
            },
        },
        {
            title:intl.formatMessage({id:'order.data.property.paymentStatus'}),
            dataIndex:'paymentStatus',  
            filters:paymentStatuss,
            render:(value)=>{
                let badge = <Badge status="default" />                
                switch(value){
                    case "Notpaid":
                        badge = <Badge status="warning" />
                        break
                    case "Paid":
                        badge = <Badge status="success" />
                        break
                }
                return(
                    <Space>
                        {badge} {getNsText(paymentStatuss,value)}
                    </Space>
                )
            },
        },
        {
            title:intl.formatMessage({id:'order.data.property.paymentType'}),
            dataIndex:'paymentType',
            render:(value:string)=>{
                let element = undefined
                const tag = getNsText(paymentTypes,value)
                switch(value){
                    case "Weixin":
                        element = <Tooltip title={tag}><WechatFilled style={{color:"#52c232"}} /></Tooltip>
                        break
                    case "Alipay":
                        element = <Tooltip title={tag}><AlipayOutlined style={{color:"#01a0ea"}} /></Tooltip>
                        break
                    case "Applepay":
                        element = <Tooltip title={tag}><AppleFilled style={{color:"#333333"}} /></Tooltip>
                        break                    
                }
                return element
            },
            filters:paymentTypes
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
                        <AppButton tooltip={intl.formatMessage({id:'global.button.tooltip.details'})} onClick={()=>{onClickDetailsHandler(record)}} iconProps={{name:"details",color:"#333333"}} />                        
                        <Popconfirm title={intl.formatMessage({id:'order.data.alert.audit.title'})}>
                            <AppButton disabled={record.orderStatus!="Unaudited"} iconProps={{name:"verify",color:"#333333",size:18}} style={{marginLeft:"4px"}} />
                        </Popconfirm>
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

    const onFilterPriceHandler=(setSelectedKeys:(keys:React.Key[])=>void,confirm:(param?: FilterConfirmProps) => void)=>{
        setSelectedKeys(prices)
        confirm()
    }
    
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]) 

    const fetchData = () => {
        setLoading(true);
        fetch('/api/orders',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<OrderData> | SorterResult<OrderData>[], extra: TableCurrentDataSource<OrderData>) =>{               
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

    const onClickDetailsHandler=(record:any)=>{        
        setWindowData(record) 
        setWindowOpen(true)       
    }

    const windowProps:OrderDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        closeWindowHandler:setWindowOpen
    }

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

    // 查询面版属性
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        searchPropertyItems:[
            {label:intl.formatMessage({id:'order.data.property.account'}), value:'account'},
            {label:intl.formatMessage({id:'order.data.property.sn'}), value:'sn'},
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
            <OrderDetailsWindow {...windowProps} />
        </Container>
    )
}

export default OrderPage