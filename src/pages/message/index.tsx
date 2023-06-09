import DataGrid from '@/components/datagrid';
import Container from '@/layouts/components/Container';
import { WardenData } from '@/pages/typings';
import type { ColumnsType, } from 'antd/es/table';
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { useState,useEffect } from 'react';
import { DeleteOutlined,ReadOutlined,FileSearchOutlined } from '@ant-design/icons';
import { Button, message,Space,DatePicker,TablePaginationConfig, Tooltip, Badge, Form, Select, Dropdown, MenuProps, Popconfirm, Tag } from 'antd';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { history, useIntl } from 'umi';
import { getNs, getNsText } from '@/utils/stringUtils';
import OrderDetailsWindow, { OrderDetailsWindowProps } from './components/MessageDetailsWindow';
import AppButton from '@/components/button';
const { RangePicker } = DatePicker;
/**
 * Page - 消息
 * @returns 
 */
const MessagePage=()=>{
    
    const intl = useIntl()
    const locale = intl.locale
    const [data,setData] = useState<MessageData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<MessageData>()  
 
    const msgTypes =[
        {text:intl.formatMessage({id:'message.option.type.notice'}),value:'Notice'}, 
        {text:intl.formatMessage({id:'message.option.type.event'}),value:'Event'}, 
        {text:intl.formatMessage({id:'message.option.type.promotion'}),value:'Promotion'}
    ]

    const reads =[
        {label:intl.formatMessage({id:'message.option.read.true'}),value:'true'},
        {label:intl.formatMessage({id:'message.option.read.false'}),value:'false'}
    ]

    const markItems=[
        {label:intl.formatMessage({id:'message.button.option.checked'}),key:'Checked'},
        {label:intl.formatMessage({id:'message.button.option.all'}),key:'All'}
    ]

    const markMenus:MenuProps = {
        items:markItems,
        onClick:(item:any)=>{
            console.log(item)
            message.success(intl.formatMessage({id:'message.message.read.success'}))
        }
    }
    
    const columns:ColumnsType<OrderData> = [
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
            sorter:true,
            
        },
        {
            title:intl.formatMessage({id:'global.data.property.title'}),
            dataIndex:'title',
            render:(value:any,record:any)=>{
                const badge = record.isRead ? <Badge status="default" /> : <Badge status="processing" />
                const linkColor = record.isRead ? '#aaa' : '#333'
                return(<Space>{badge} <a style={{color:linkColor}} onClick={()=>{onClickDetailsHandler(record)}}>{value}</a></Space>)
            }
        },
        {
            title:intl.formatMessage({id:'message.data.property.type'}),
            dataIndex:'msgType',
            filters:msgTypes,
            render:(value)=>{       
                const text = getNsText(msgTypes,value)         
                let tag = <Tag color="processing">{text}</Tag>                             
                switch(value){
                    case "Event":
                        tag = <Tag color="orange">{text}</Tag>
                        break
                    case "Promotion":
                        tag = <Tag color="magenta">{text}</Tag>
                        break
                }
                return(tag)
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
            width:'80px',
            render:(value:any,record:any)=>{
                return(
                    <Space>                        
                        <AppButton tooltip={intl.formatMessage({id:'global.button.tooltip.details'})} onClick={()=>{onClickDetailsHandler(record)}}><FileSearchOutlined /></AppButton>                       
                        <Popconfirm title={intl.formatMessage({id:'message.alert.delete.title'})}>
                            <AppButton><DeleteOutlined /></AppButton>
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
    
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams),locale]) 

    const fetchData = () => {
        setLoading(true);
        fetch('/api/messages',{
            method:'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "local":locale
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<MessageData> | SorterResult<MessageData>[], extra: TableCurrentDataSource<MessageData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

    // 表格工具栏button
    const toolbarButtons = [
        <Dropdown.Button onClick={()=>{message.success(intl.formatMessage({id:'message.message.read.success'}))}} menu={markMenus}>{intl.formatMessage({id:'message.button.read.mark'})}</Dropdown.Button>
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

    const onClickDetailsHandler=(record:any)=>{        
        setWindowData(record) 
        setWindowOpen(true)       
    }

    const windowProps:OrderDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        closeWindowHandler:setWindowOpen
    }

    // 查询面版属性
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        searchPropertyItems:[
            {label:intl.formatMessage({id:'global.data.property.title'}), value:'title'},
            {label:intl.formatMessage({id:'global.data.property.content'}), value:'content'},
        ],
        filterFormItems:[
            <Form.Item name="terminal" noStyle key="terminal">
                <Select allowClear options={reads} placeholder={intl.formatMessage({id:'message.data.property.read'})} />
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
export default MessagePage