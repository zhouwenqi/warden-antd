import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings";
import { getNsText } from "@/utils/stringUtils";
import { WardenData } from '@/pages/typings';
import { Button, Space, TablePaginationConfig, DatePicker,message, Tag, Tooltip } from "antd";
import type { ColumnsType, } from 'antd/es/table';
import type { FilterValue, SorterResult, FilterConfirmProps, TableCurrentDataSource } from 'antd/es/table/interface';
import { useIntl } from "umi";
import DataGrid from '@/components/datagrid';
import { DataGridProps, DataGridToolbarProps,DataGridSearchPanelProps } from '@/components/datagrid/typings';
import { AuditOutlined } from '@ant-design/icons';
import { useState,useEffect } from "react";
import AppButton from "@/components/button";

const { RangePicker } = DatePicker;

export interface CouponListWindowProps extends WindowProps {
    data?:CouponBatchData;
    onEdit?:(data:CouponData)=>void;
}

/**
 * Window - 优惠券列表
 * @param props 
 * @returns 
 */
const CouponListWindow=(props:CouponListWindowProps)=>{

    const [list,setList] = useState<CouponData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    
    const intl = useIntl()  
    const {closeWindowHandler, data, ...WindowProps} = props    
    const windowProps:WindowProps = {
        width:950,
        title:data ? data!.name : intl.formatMessage({id:'coupon.data.list.title'}),
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }

    const couponStatus =[
        {text:intl.formatMessage({id:'coupon.data.option.status.receive'}),value:'Receive'}, 
        {text:intl.formatMessage({id:'coupon.data.option.status.use'}),value:'Use'},
        {text:intl.formatMessage({id:'coupon.data.option.status.expire'}),value:'Expire'}, 
    ]

    const columns:ColumnsType<CouponData> = [
        {
            title:intl.formatMessage({id:'global.data.property.id'}),
            dataIndex:'id',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'coupon.data.property.code'}),
            dataIndex:'code',
            sorter:true,
        },
        {
            title:intl.formatMessage({id:'couponBatch.data.property.denomination'}),
            dataIndex:'denomination',
        },
        {
            title:intl.formatMessage({id:'coupon.data.property.receiveMember'}),
            dataIndex:'receiveMember',
            sorter:true,
        },
        {
            title:intl.formatMessage({id:'coupon.data.property.status'}),
            dataIndex:'status',
            filters:couponStatus,
            render:(value)=>{
                let tagColor = "default";
                switch(value) {
                    case "Receive":
                        tagColor = "green"
                        break
                    case "Use":
                        tagColor = "volcano"
                        break
                    case "Expire":
                        tagColor = "default"
                        break
                }
                return(
                    <Tag color={tagColor}>{getNsText(couponStatus,value)}</Tag>
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
            render:(value:any,record:any)=>{
                return(
                    <Space> 
                        <AppButton tooltip={intl.formatMessage({id:'coupon.button.audit'})}  onClick={()=>{onClickAuditHandler(record)}}>
                            <AuditOutlined />
                        </AppButton> 
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

    const onClickAuditHandler=(e:CouponData|CouponData[])=>{
        message.success(intl.formatMessage({id:'coupon.alert.audit.success'}))
    }
    
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]) 

    const fetchData = () => {
        setLoading(true);
        fetch('/api/coupons',{
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
            setList(results.list);
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<CouponData> | SorterResult<CouponData>[], extra: TableCurrentDataSource<CouponData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary"  onClick={()=>{onClickAuditHandler(list!)}} icon={<AuditOutlined />} key="addBtn">{intl.formatMessage({id:'coupon.button.audits'})}</Button>        
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
        setupColumnsButtonShow:false,
        setupRowHeightButtonShow:false,
        exportButtonShow:false,
        leftButtons:toolbarButtons
    }

    // 查询面版属性
    const searchBarProps:DataGridSearchPanelProps = {
        searchButtonType:'icon',
        searchButtonTheme:'primary',
        searchPropertyItems:[
            {label:intl.formatMessage({id:'coupon.data.property.code'}), value:'code'},
            {label:intl.formatMessage({id:'coupon.data.property.receiveMember'}), value:'receiveMember'},
            {label:intl.formatMessage({id:'couponBatch.data.property.denomination'}),value:'denomination'}
        ], 
          
    }

    // datagrid属性
    const gridProps:DataGridProps = {
        toolBarProps,
        searchBarProps,
        columns,        
        dataSource:list,
        rowKey:(record)=>record.id,
        pagination:tableParams.pagination,
        loading,
        onChange:onChangeHandler,
        size:'small'
    }


    return(
        <Window {...windowProps}>
            <DataGrid {...gridProps} />
        </Window>
    )
}

export default CouponListWindow