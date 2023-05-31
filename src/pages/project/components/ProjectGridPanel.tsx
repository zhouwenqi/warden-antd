import AppIcon from '@/components/AppIcon'
import AppButton from '@/components/button'
import { Space, Tooltip } from 'antd'
import { useIntl } from 'umi'
import styles from '../index.less'
import { TeamOutlined} from '@ant-design/icons';

/**
 * 项目列表卡片视图
 * @param props 
 * @returns 
 */
const ProjectGridPanel=(props:ProjectPanelProps)=>{
    const intl = useIntl()
    let panels:JSX.Element[] = [
        <Tooltip title={intl.formatMessage({id:'project.tooltip.create'})} key={"add"}>
            <div className={styles.itemBox} key={'add'} onClick={()=>{props.onCreate!()}}>
                <div className={styles.itemFace} style={{height:"218px",borderRadius:"8px",borderBottom:"none"}}>
                    <AppIcon name='add' size={60} color='currentColor' />
                </div>
            </div>
        </Tooltip>
    ]
    props.data.forEach((item,index)=>{
        panels.push(
            <Tooltip title={item.description} key={index}>
                <div className={styles.itemBox} key={index} onClick={()=>{props.onViewDetails!(item)}}>
                    <div className={styles.itemFace}>
                        <img src={item.icon} />
                    </div>
                    <div className={styles.itemDes}>
                        <label>{item.name}</label>
                        <label><TeamOutlined style={{color:"#999999"}} />{item.memberCount}</label>
                    </div>
                </div>
            </Tooltip>
        )
    })
    return(        
        <Space style={{padding:"20px"}} size={[20,20]} wrap >
            {panels}
        </Space>
    )

}
export default ProjectGridPanel