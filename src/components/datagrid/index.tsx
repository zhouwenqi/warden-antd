import { Button, Col, Input, Row, Space, Table } from 'antd';
import { ReloadOutlined, DeliveredProcedureOutlined,DeleteColumnOutlined,ColumnHeightOutlined } from '@ant-design/icons';
import styles from './index.less';
import { DataGridProps, DataGridToolbarProps, DataGridSearchPanelProps } from './typings';
import AppButton from '../button';
import SearchBox from '../search/SearchBox';

/**
 * 数据集组件
 * @param props 继承Antd-Table属性
 * @returns 
 */
const DataGrid=(props:DataGridProps)=>{
    const  {headerElement,...tableProps} = props
    const filterElements:JSX.Element[] = [
        <Input />
    ]
    return(
        <div className={styles.box}>
            <DataGridSearchPanel filterElements={filterElements} />        
            <div className={styles.table}>
                <DataGridToolbar {...props.toolBarProps} />
                <Table {...tableProps} />
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
    return(
        <div className={styles.header}>
            <div>
                <Space>
                    {props.leftButtons}
                </Space>
            </div>
            <div>
                <Space>
                    <AppButton tooltip='Refresh...'>
                        <ReloadOutlined className={styles.toolbarIco} />
                    </AppButton>
                    <AppButton tooltip='Export excel file'>
                        <DeliveredProcedureOutlined className={styles.toolbarIco} />
                    </AppButton>
                    <AppButton tooltip='Setup columns'>
                        <DeleteColumnOutlined className={styles.toolbarIco} />
                    </AppButton>
                    <AppButton tooltip='Row height'>
                        <ColumnHeightOutlined className={styles.toolbarIco} />
                    </AppButton>
                </Space>
            </div>    
        </div>
    )
}

const DataGridSearchPanel=(props:DataGridSearchPanelProps)=>{
    let elements:JSX.Element[] = props.filterElements ? props.filterElements : []
    elements.push(<SearchBox />)
    let columlns:JSX.Element[] = []
    const searchBoxOffset = (4 - (elements.length % 4)) * 6
    console.log('offset:'+searchBoxOffset)
    elements.forEach((item,index)=>{
        let offset = 0
        if(index >= elements.length-1){
            offset = searchBoxOffset
        }
        columlns.push(<Col key={'dsp'+index} offset={offset} span={6}>{item}</Col>)
    })
    
    return(
        <div className={styles.searchBox}>
            <Row gutter={[16,16]}> 
                {columlns}
            </Row>
        </div>
    )
}

export default DataGrid