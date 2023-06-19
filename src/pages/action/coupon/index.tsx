import DataGrid from '@/components/datagrid';
import Container from '@/layouts/components/Container';
import { WardenData } from '@/pages/typings';
import type { ColumnsType, } from 'antd/es/table';
import type { FilterValue, SorterResult,FilterConfirmProps,TableCurrentDataSource } from 'antd/es/table/interface';
import { useState,useEffect, useCallback } from 'react';
import { PlusOutlined,UnorderedListOutlined,BlockOutlined,FileSearchOutlined } from '@ant-design/icons';
import { Button, message,Space,DatePicker,TablePaginationConfig, Badge, Form, Select, InputNumber, Input, Divider, Tag, notification } from 'antd';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { useIntl } from 'umi';
import AppIcon from '@/components/AppIcon';
import { getNs, getNsText } from '@/utils/stringUtils';
import AppButton from '@/components/button';
import CouponBatchDetailsWindow,{CouponDetailsWindowProps} from './components/CouponBatchDetailsWindow';
import CouponBatchFormWindow, { CouponBatchFormWindowProps } from './components/CouponBatchFormWindow';
import CouponIssuanceWindow, { CouponIssuanceWindowProps } from './components/CouponIssuanceWindow';
import CouponListWindow, { CouponListWindowProps } from './components/CouponListWindow';

const { RangePicker } = DatePicker;

/**
 * Page - 优惠券批次
 * @returns 
 */
const CouponPage=()=>{
   
    const intl = useIntl()
    const [data,setData] = useState<CouponBatchData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<CouponBatchData>()
    const [detailsWindowOpen,setDetailsWindowOpen]=useState<boolean>(false)
    const [detailsWindowData,setDetailsWindowData]=useState<CouponBatchData>()
    const [issuanceWindowOpen,setIssuanceWindowOpen]=useState<boolean>(false)
    const [issuanceWindowData,setIssuanceWindowData]=useState<CouponBatchData>()
    const [listWindowOpen,setListWindowOpen]=useState<boolean>(false)
    const [listWindowData,setListWindowData]=useState<CouponBatchData>()
 
    const bitchEnables =[
        {text:intl.formatMessage({id:'global.button.disable'}),value:'false'}, 
        {text:intl.formatMessage({id:'global.button.enable'}),value:'true'}
    ]

    const receiveMethods =[
        {text:intl.formatMessage({id:'couponBatch.data.receiveMethod.auto'}),value:'Auto'}, 
        {text:intl.formatMessage({id:'couponBatch.data.receiveMethod.active'}),value:'Active'}
    ]

    const couponTypes =[
        {text:intl.formatMessage({id:'couponBatch.data.couponType.cash'}),value:'Cash'}, 
        {text:intl.formatMessage({id:'couponBatch.data.couponType.discount'}),value:'Discount'},
        {text:intl.formatMessage({id:'couponBatch.data.couponType.exchange'}),value:'Exchange'}
    ]

    const columns:ColumnsType<CouponBatchData> = [
        {
            title:intl.formatMessage({id:'couponBatch.data.property.name'}),
            dataIndex:'name',
            sorter:true,
            render:(value:any,record:any)=>{
                return(<a onClick={()=>{onClickDetailsHandler(record)}}>{value}</a>)
            }
        },
        {
            title:intl.formatMessage({id:'couponBatch.data.property.quantity'}),
            dataIndex:'quantity',
            sorter:true,
        },
        {
            title:intl.formatMessage({id:'couponBatch.data.property.denomination'}),
            dataIndex:'denomination',
        },
        {
            title:intl.formatMessage({id:'couponBatch.data.property.where'}),
            dataIndex:'where',
            sorter:true,
        },
        {
            title:intl.formatMessage({id:'couponBatch.data.property.enabled'}),
            dataIndex:'enabled',
            filters:bitchEnables,
            render:(value)=>{
                let badge = value ?   <Badge status="success" />  : <Badge status="default" />                
                return(
                    <Space>
                        {badge} <label style={{color:value?'currentColor':'#999999'}}>{getNsText(bitchEnables,String(value))}</label>
                    </Space>
                )
            },
        },
        {
            title:intl.formatMessage({id:'couponBatch.data.property.receiveMethod'}),
            dataIndex:'receiveMethod',  
            filters:receiveMethods,
            render:(value)=>{               
                return(
                    <Tag>{getNsText(receiveMethods,value)}</Tag>
                )
            },
        },
        {
            title:intl.formatMessage({id:'couponBatch.data.property.couponType'}),
            dataIndex:'couponType',            
            render:(value:string)=>{                
                return <Tag>{getNsText(couponTypes,value)}</Tag>
            },
            filters:couponTypes
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
            render:(value:any,record:any)=>{
                return(
                    <Space>                        
                        <AppButton tooltip={intl.formatMessage({id:'global.button.tooltip.details'})} onClick={()=>{onClickDetailsHandler(record)}}><FileSearchOutlined /></AppButton>                       
                        <Divider type="vertical" />
                        <AppButton tooltip={intl.formatMessage({id:'couponBatch.button.list'})} onClick={()=>{onClickListHandler(record)}}><UnorderedListOutlined /></AppButton>   
                        <AppButton tooltip={intl.formatMessage({id:'couponBatch.button.issuance'})} onClick={()=>{onClickIssuanceHandler(record)}}><BlockOutlined /></AppButton> 
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
    }, [JSON.stringify(tableParams)]) 

    const fetchData = () => {
        setLoading(true);
        fetch('/api/coupon/batchs',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<CouponBatchData> | SorterResult<CouponBatchData>[], extra: TableCurrentDataSource<CouponBatchData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary" onClick={()=>{onClickCreateHandler()}} icon={<PlusOutlined />} key="addBtn">{intl.formatMessage({id:'couponBatch.button.add'})}</Button>        
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
        setDetailsWindowData(record)
        setDetailsWindowOpen(true)       
    }

    const onClickCreateHandler=()=>{
        setFormWindowData(undefined)
        setFormWindowOpen(true)
    }

    const onClickEditHandler=(e:CouponBatchData)=>{
        setFormWindowData(e);
        setFormWindowOpen(true)
    }

    const onClickIssuanceHandler=(e:CouponBatchData)=>{
        setIssuanceWindowData(e)
        setIssuanceWindowOpen(true)
    }

    const onClickListHandler=(e:CouponBatchData)=>{
        setListWindowData(e)
        setListWindowOpen(true)
    }

    const onSubmitHandler=(e:CouponBatchData)=>{
        const key = 'couponBitchSubmit'
        message.loading({ content: intl.formatMessage({id:'global.message.submitting'}), key })
        setTimeout(() => {
            message.success({ content: intl.formatMessage({id:'global.message.commit'}), key, duration: 2 })
            setFormWindowOpen(false)
        }, 1000)

    }

    const onIssuanceHandler=(e:IssuanceData)=>{
        const key = 'couponIssuanceSubmit'
        message.loading({ content: intl.formatMessage({id:'global.message.submitting'}), key })
        setTimeout(() => {
            message.success({ content: intl.formatMessage({id:'couponIssuance.alert.generating.submit'}), key, duration: 2 })
            setIssuanceWindowOpen(false)
            setTimeout(()=>{
                notification.success({
                    message:intl.formatMessage({id:'couponIssuance.alert.generating.complate.title'}),
                    description:intl.formatMessage({id:'couponIssuance.alert.generating.complate.content'},{quantity:e.quantity}),
                    placement:'bottomRight'
                })
            },5000)
        }, 1000)

    }

    const windowDetailsProps:CouponDetailsWindowProps = {
        open:detailsWindowOpen,
        data:detailsWindowData,
        onEdit:onClickEditHandler,
        closeWindowHandler:setDetailsWindowOpen
    }   

    const windowFormProps:CouponBatchFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }

    const windowIssuanceProps:CouponIssuanceWindowProps ={
        open:issuanceWindowOpen,
        data:issuanceWindowData,
        onSubmit:onIssuanceHandler,        
        closeWindowHandler:setIssuanceWindowOpen
    }

    const windowListProps:CouponListWindowProps ={
        open:listWindowOpen,
        data:listWindowData,      
        closeWindowHandler:setListWindowOpen
    }


    // 查询面版属性
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        searchPropertyItems:[
            {label:intl.formatMessage({id:'couponBatch.data.property.name'}), value:'name'},
            {label:intl.formatMessage({id:'couponBatch.data.property.description'}), value:'description'},
            {label:intl.formatMessage({id:'couponBatch.data.property.denomination'}),value:'denomination'}
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
        onChange:onChangeHandler,
    }
    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />
            <CouponBatchDetailsWindow {...windowDetailsProps} />
            <CouponBatchFormWindow {...windowFormProps} />
            <CouponIssuanceWindow {...windowIssuanceProps} />
            <CouponListWindow {...windowListProps} />
        </Container>
    )
}

export default CouponPage