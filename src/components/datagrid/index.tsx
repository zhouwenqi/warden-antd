import { Button, Tree, Form, TreeProps, Popconfirm, Space, Table,Dropdown,Popover, Divider, Pagination } from 'antd';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';
import { ReloadOutlined, DeliveredProcedureOutlined,DeleteColumnOutlined,ColumnHeightOutlined,DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';
import { DataGridProps, DataGridToolbarProps, DataGridSearchPanelProps, DataGridColumnType } from './typings';
import AppButton from '../button';
import SearchBox from '../search/SearchBox';
import { useIntl } from 'umi';
import { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';

/**
 * 数据集组件
 * @param props 继承Antd-Table属性
 * @returns 
 */
const DataGrid=(props:DataGridProps)=>{
    const  {extElements,columns,disenableSelectCloumn,...tableProps} = props    
    const [gridColumns,setGridColumns] = useState<DataGridColumnType[]>([])    
    const [rowHeight,setRowHeight] = useState<SizeType>('large')
    const [selectedRowKeys,setSelectedRowKeys]=useState<React.Key[]>([])
    
    useEffect(()=>{     
        let gcs:DataGridColumnType[]=[]       
        columns?.forEach((item,index)=>{            
            gcs.push({visible:true, key:(item as any).dataIndex,itemIndex:index})
        })
        setGridColumns(gcs)       
    },[])   

    let dyColumns:ColumnsType<typeof columns>=[]
    gridColumns.forEach((item,index)=>{
        if(item.visible){
            dyColumns.push(columns![item.itemIndex])
        }        
    })
    const onFinishHandler=(values:any)=>{
        console.log('SearchBarprops.onSearch:',values)
        if(props.searchBarProps?.onSearch){
            props.searchBarProps?.onSearch(values)
        }
    }

    const onSetupColumnHandler=(cols:DataGridColumnType[])=>{
        setGridColumns(cols)
    }

    const onSetupRowheightHandler=(e:string)=>{
        setRowHeight(e as SizeType)
    }

    const rowSelectionProps = {
        selectedRowKeys,
        onChange:(newSelectedRowKeys: React.Key[])=>{
            setSelectedRowKeys(newSelectedRowKeys)            
        }
    }

    const toolBarprops = {
        deleteButtonShow:!disenableSelectCloumn,
        ...props.toolBarProps
    }
    return(
        <div className={styles.box}>
            <Form onFinish={onFinishHandler}>
                <DataGridSearchPanel {...props.searchBarProps} />     
            </Form>   
            <div className={styles.table}>
                <DataGridToolbar selectedRowKeys={selectedRowKeys} columns={props.columns} {...toolBarprops} onSetupColumns={(cols:DataGridColumnType[])=>{onSetupColumnHandler(cols)}} onSetRowheightType={(e)=>{onSetupRowheightHandler(e)}} />
                <Table rowSelection={!disenableSelectCloumn ? rowSelectionProps : undefined} columns={dyColumns} {...tableProps} size={rowHeight} />    
            </div>
        </div>
    )
}

/**
 * 数据集工具栏
 * @param props 工具栏属性 
 * @returns 
 */
const DataGridToolbar=(props:DataGridToolbarProps)=>{
    const intl = useIntl();  
    const [gridColumns,setGridColumns] = useState<DataGridColumnType[]>([])
    useEffect(()=>{
        initColumnData()
    },[])    

    const initColumnData=()=>{
        let gcs:DataGridColumnType[]=[]
        props.columns?.forEach((item,index)=>{
            gcs.push({visible:true, key:(item as any).dataIndex, itemIndex:index})
        })
        setGridColumns(gcs)
    }

    useEffect(()=>{
        if(props.onSetupColumns){
            props.onSetupColumns(gridColumns)
        }
    },[gridColumns])

    let treeColumnData:DataNode[] = []
    let checkedKeys:string[]=[]
    gridColumns.forEach((item,index)=>{
        treeColumnData.push({
            title:(props.columns![item.itemIndex] as any).title,
            key:item.key
        })
        if(item.visible){
            checkedKeys.push(item.key)
        }
    })

    // 刷新事件
    const onRefreshHandler=()=>{
        if(props.onRefresh){
            props.onRefresh()
        }
    }

    // 导出事件
    const onExportHandler=()=>{
        if(props.onExport){
            props.onExport()
        }
    }   

     // 控制列显示
    const onCheckHandler=(checkedKeysValue: string[])=>{
        if(props.onSetupColumns){
            props.onSetupColumns(getColumnsChecked(checkedKeysValue))
        }     
    }

    // 列是否选中
    const getColumnsChecked=(values:string[])=>{
        let gcs:DataGridColumnType[] = [...gridColumns] 
        gcs.forEach((item,index)=>{
            item.visible = values.includes(item.key)
        })
        return gcs        
    }

    // 重置列
    const onResetColumnHandler=()=>{
        initColumnData()
    }

    // 删除数据事件
    const onConfirmHandler=()=>{
        if(props.onDelete){
            props.onDelete(props.selectedRowKeys!)
        }
    }

    const onDragEnterHandler:TreeProps['onDragEnter'] = info => {
        // console.log(info);
    }

    // 拖拽列事件
    const onDropHandler:TreeProps['onDrop'] = info => {       
        const data = [...gridColumns]
        const dragPos = info.dragNode.pos.split('-')
        const ep = info.dropPosition
        data.splice(ep,0,data[parseInt(dragPos[1])])
        const sp = ep < parseInt(dragPos[1]) ? parseInt(dragPos[1])+1 : parseInt(dragPos[1])
        data.splice(sp,1)
        setGridColumns(data)
    }

    // 设置列Popover标题
    const popoverTitle = ()=>{
        return(
            <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"2px 0px"}}>
                    <label style={{marginRight:"4px"}}>{intl.formatMessage({id:'datagrid.toolbar.title.column.display'})}</label>
                    <a onClick={()=>{onResetColumnHandler()}}>{intl.formatMessage({id:'global.button.reset'})}</a>
                </div>
            </>
        )
    }

    const enableDeleteButton = props.selectedRowKeys && props.selectedRowKeys.length > 0

    // 设置列Popover树型菜单
    const columnPopoverContent = (
        <div>
            <Tree 
            treeData={treeColumnData}
            checkable
            draggable
            selectable={false}
            checkedKeys={checkedKeys} 
            onCheck={(checked)=>{onCheckHandler(checked as string[])}} 
            onDrop={onDropHandler}
            onDragEnter={onDragEnterHandler} />
        </div>
    )

    const onClickRowheightHandler=(e:string)=>{
        if(props.onSetRowheightType){
            props.onSetRowheightType(e)
        }
    }

    const items:MenuProps['items']=[
        {key:'larger',label:(<a onClick={()=>{onClickRowheightHandler('larger')}}>{intl.formatMessage({id:'global.size.type.larger'})}</a>)},
        {key:'middle',label:(<a onClick={()=>{onClickRowheightHandler('middle')}}>{intl.formatMessage({id:'global.size.type.middle'})}</a>)},
        {key:'small',label:(<a onClick={()=>{onClickRowheightHandler('small')}}>{intl.formatMessage({id:'global.size.type.compact'})}</a>)}
    ]

    const refreshButton = props.refreshButtonShow ? (<AppButton onClick={onRefreshHandler} tooltip={intl.formatMessage({id:'global.button.refresh'})}><ReloadOutlined className={styles.toolbarIco} /></AppButton>) : undefined
    const deleteButton = props.deleteButtonShow ? (<Popconfirm title={intl.formatMessage({id:'datagrid.toolbar.confirm.delete.title'})} onConfirm={onConfirmHandler}><AppButton disabled={!enableDeleteButton} onClick={()=>{props.onDelete?.bind(props.selectedRowKeys)}} tooltip={intl.formatMessage({id:'global.button.delete'})}><DeleteOutlined className={styles.toolbarIco} /></AppButton></Popconfirm>) : undefined
    const setupColumnButton = props.setupColumnsButtonShow ? (<Popover trigger="click" title={popoverTitle} content={columnPopoverContent} placement="bottomRight"><AppButton tooltip={intl.formatMessage({id:'datagrid.toolbar.button.setupColumns'})}><DeleteColumnOutlined className={styles.toolbarIco} /></AppButton></Popover>) : undefined
    const exportButton = props.exportButtonShow ? (<AppButton onClick={onExportHandler} tooltip={intl.formatMessage({id:'datagrid.toolbar.button.exportExcel'})}><DeliveredProcedureOutlined className={styles.toolbarIco} /></AppButton>) : undefined
    const setupRowHeightButton = props.setupRowHeightButtonShow ? (<Dropdown menu={{ items, selectable:true,defaultSelectedKeys:['larger'] }} placement="bottomRight"><AppButton tooltip={intl.formatMessage({id:'datagrid.toolbar.button.density'})}><ColumnHeightOutlined className={styles.toolbarIco} /></AppButton></Dropdown>) : undefined
    const divider = deleteButton ? <Divider type="vertical" /> : undefined
    return(
        <div className={styles.header}>
            <div>
                <Space>
                    {props.leftButtons}
                </Space>
            </div>
            <div data-warden-box="space">
                <Space>
                    {deleteButton}
                    {divider}
                    {refreshButton}
                    {exportButton}
                    {setupColumnButton}
                    {setupRowHeightButton}
                </Space>
            </div>    
        </div>
    )
}

DataGridToolbar.defaultProps = {
    refreshButtonShow:true,
    deleteButtonShow:true,
    setupColumnsButtonShow:true,
    exportButtonShow:true,
    setupRowHeightButtonShow:true
}

/**
 * 数据集查询面版
 * @param props 查询面版属性
 * @returns 
 */
const DataGridSearchPanel=(props:DataGridSearchPanelProps)=>{
    const intl = useIntl()
    const resetButton = props.resetButtonShow ? <Button htmlType='reset'>{intl.formatMessage({id:'global.button.reset'})}</Button> : undefined
    return(      
        <div className={styles.searchBox}>            
            <div className={styles.searchBoxLeft}>
                <Space wrap>{props.filterFormItems}</Space>
            </div>   
            <div className={styles.searchBoxRight}>
                <Space>
                    <SearchBox {...props} />
                    {resetButton}
                </Space>
            </div>    
        </div>
    )
}

export default DataGrid