import Window from "@/components/window"
import { WindowProps } from "@/components/window/typings"
import { getTagColor } from "@/utils/stringUtils";
import { Divider, Tag } from "antd";
import { useIntl } from "umi";
export interface OperationDetailsWindowProps extends WindowProps {
    data?:OperationData;
}
const OperationDetailsWindow = (props:OperationDetailsWindowProps)=>{
    const intl = useIntl()  
    const {closeWindowHandler,data,...WindowProps} = props
    
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'operation.log.details.title'}),        
        onClose:()=>{closeWindowHandler!(false)},
        ...WindowProps
    }
    const panel = data ? (<div data-warden-details="box">
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.id'})}：</label><span>{data.id}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.name'})}：</label><span>{data.name}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.type'})}：</label><span><Tag key={data.action} color={getTagColor(data.action)}>{data.action}</Tag></span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.terminal'})}：</label><span>{data.terminal}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.application'})}：</label><span>{data.appType}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.ip'})}：</label><span>{data.ip}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'operation.data.property.content'})}：</label><span>{data.content}</span>
        </div>
        <Divider />
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.createDate'})}：</label><span>{data.createDate}</span>
        </div>
        <div className="details-item">
           <label>{intl.formatMessage({id:'global.data.property.modifyDate'})}：</label><span>{data.modifyDate}</span>
        </div>
    </div>) : undefined
    return(
        <Window {...windowProps}>
            {panel}
        </Window>
    )
}
export default OperationDetailsWindow