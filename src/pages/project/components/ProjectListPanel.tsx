import { Avatar, Button, List, Tooltip } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import styles from '../index.less'
import { useIntl } from "umi"

const ProjectListPanel=(props:ProjectPanelProps)=>{
    const intl = useIntl()
    return(
        <div className={styles.listBox}>
            <div style={{textAlign:"right"}}> 
                <Tooltip title={intl.formatMessage({id:'project.tooltip.create'})}>
                    <Button onClick={()=>{props.onCreate!()}} type="primary" icon={ <PlusOutlined />}>{intl.formatMessage({id:'global.button.create'})}</Button>
                </Tooltip>
            </div>
            <List
             itemLayout="horizontal" 
             dataSource={props.data}
             renderItem={(item,index)=>{
                return(
                    <List.Item actions={[<a onClick={()=>{props.onViewDetails!(item)}}>{intl.formatMessage({id:'global.button.tooltip.details'})}</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={item.icon} />}
                        title={<a onClick={()=>{props.onViewDetails!(item)}}>{item.name}</a>}
                        description={item.description}
                        key={index}
                        />
                    </List.Item>
                )
             }}
             >
            </List>
        </div>
    )
}

export default ProjectListPanel