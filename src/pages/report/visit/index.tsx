import DataGrid from '@/components/datagrid';
import Container from '@/layouts/components/Container';
import { WardenData } from '@/pages/typings';
import type { ColumnsType } from 'antd/es/table';
import { useState,useEffect } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Button } from 'antd';
import { DataGridToolbarProps } from '@/components/datagrid/typings';

/**
 * Page - 访问统计
 * @returns 
 */
const VisitPage=()=>{
    const [data,setData] = useState<VisitData[]>()
    const [loading,setLoading] = useState(false)
    const [tableParams,setTableParams] = useState<WardenData.ITableParams>(
        {pagination:{current:1,pageSize:10}}
    )
    const columns:ColumnsType<VisitData> = [
        {
            title:'UUID',
            dataIndex:'uuid',
            sorter:true,
        },
        {
            title:'帐号',
            dataIndex:'uid'
        },
        {
            title:'IP',
            dataIndex:'ip'
        },
        {
            title:'访问内容',
            dataIndex:'page',
        },
        {
            title:'设备',
            dataIndex:'terminal'
        },
        {
            title:'应用',
            dataIndex:'appType'
        },
        {
            title:'访问时间',
            dataIndex:'time',
            sorter:true,
            width:'220px'
        },
    ]
    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = () => {
        setLoading(true);
        fetch('/api/report/visits')
          .then((response) => response.json())
          .then((results ) => {
            console.log(results)
            setData(results);
            setLoading(false);
            setTableParams({
              ...tableParams,
              pagination: {
                ...tableParams.pagination
              },
            })
          })
    }

    const toolbarButtons = [    
        <Button type="primary" key="addBtn">Add</Button>,    
        <Button icon={<BarChartOutlined />} key="chartsBtn">Charts</Button>        
    ]
    const toolbarProps:DataGridToolbarProps = {
        leftButtons:toolbarButtons
    }

    return(
        <Container boxStyle="box" showTitle={true}>
            <DataGrid toolBarProps={toolbarProps} columns={columns} rowKey={(record)=>record.uuid} dataSource={data} pagination={tableParams.pagination} loading={loading} size="middle" />                               
        </Container>
    )
}
export default VisitPage