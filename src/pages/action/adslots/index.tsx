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
import AdslotsDetailsWindow, { AdslotsDetailsWindowProps } from "./components/AdslotsDetailsWindow";
import AdslotsFormWindow, { AdslotsFormWindowProps } from "./components/AdslotsFormWindow";

const { RangePicker } = DatePicker;
/**
 * Page - 广告位
 * @returns 
 */
const AdslotsPage=()=>{
    const intl = useIntl()
    const locale = useIntl().locale
    const [data,setData] = useState<AdslotsData[]>()
    const [loading,setLoading] = useState(false)
    const [timers,setTimers] = useState<string[]>()
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>({pagination:{current:1,pageSize:10}})
    const [windowOpen,setWindowOpen]=useState<boolean>(false)
    const [windowData,setWindowData]=useState<AdslotsData>()
    const [formWindowOpen,setFormWindowOpen]=useState<boolean>(false)
    const [formWindowData,setFormWindowData]=useState<AdslotsData>()

    const slotsTypeOptions = [
        {text:intl.formatMessage({id:'adslots.data.option.type.image'}),value:'Image'},
        {text:intl.formatMessage({id:'adslots.data.option.type.video'}),value:'Video'},
        {text:intl.formatMessage({id:'adslots.data.option.type.text'}),value:'Text'},
    ]

    const slotsEnables =[
        {text:intl.formatMessage({id:'global.button.disable'}),value:'false'}, 
        {text:intl.formatMessage({id:'global.button.enable'}),value:'true'}
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

    const columns:ColumnsType<AdslotsData> = [        
        {
            title:intl.formatMessage({id:'adslots.data.property.code'}),
            dataIndex:'code',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'global.data.property.name'}),
            dataIndex:'name',
        },
        {
            title:intl.formatMessage({id:'global.data.property.width'}),
            dataIndex:'width'
        },
        {
            title:intl.formatMessage({id:'global.data.property.height'}),
            dataIndex:'width'
        },
        {
            title:intl.formatMessage({id:'global.data.property.quantity'}),
            dataIndex:'quantity',
            sorter:true
        },
        {
            title:intl.formatMessage({id:'global.data.property.enable'}),
            dataIndex:'enabled',
            sorter:true,
            filters:slotsEnables,
            render:(value)=>{
                let badge = value ?   <Badge status="success" />  : <Badge status="default" />                
                return(
                    <Space>
                        {badge} <label style={{color:value?'currentColor':'#999999'}}>{getNsText(slotsEnables,String(value))}</label>
                    </Space>
                )
            }

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
            width:'100px',
            dataIndex:'actions',
            render:(value:any,record:any)=>{
                return(
                    <Space>
                        <AppButton tooltip={intl.formatMessage({id:'global.button.tooltip.details'})} onClick={()=>{onClickDetailsHandler(record)}}><FileSearchOutlined /></AppButton>
                        <Divider type="vertical" />
                        <Popconfirm placement="topLeft" title={intl.formatMessage({id:'global.button.tooltip.delete'})}><AppButton><DeleteOutlined /></AppButton></Popconfirm>
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
        fetch('/api/action/adslots',{
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
    const onChangeHandler = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter:  SorterResult<AdslotsData> | SorterResult<AdslotsData>[], extra: TableCurrentDataSource<AdslotsData>) =>{               
        setTableParams({
            pagination,
            ...filters,
            ...sorter
        })
    }

     // 表格工具栏button
     const toolbarButtons = [    
        <Button type="primary" onClick={()=>{onClickCreateHandler()}} icon={<PlusOutlined />} key="addBtn">{intl.formatMessage({id:'adslots.button.add'})}</Button>        
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
            {label:intl.formatMessage({id:'adslots.data.property.code'}), value:'code'},
            {label:intl.formatMessage({id:'global.data.property.name'}), value:'account'},
            {label:intl.formatMessage({id:'global.data.property.description'}), value:'description'}            
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

    const onClickEditHandler=(e:AdslotsData)=>{
        setFormWindowData(e);
        setFormWindowOpen(true)
    }

    const onSubmitHandler=(e:AdslotsData)=>{
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
    const windowDetailsrops:AdslotsDetailsWindowProps = {
        open:windowOpen,
        data:windowData,
        onEdit:onClickEditHandler,
        closeWindowHandler:setWindowOpen
    }

    const windowFormProps:AdslotsFormWindowProps = {
        open:formWindowOpen,
        data:formWindowData,
        onSubmit:onSubmitHandler,
        closeWindowHandler:setFormWindowOpen
    }
   
    

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid {...gridProps} />  
            <AdslotsDetailsWindow {...windowDetailsrops} />
            <AdslotsFormWindow {...windowFormProps} />
        </Container>
    )
}
export default AdslotsPage