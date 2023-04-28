import styles from './index.less'
import { Tooltip } from 'antd'
import AppIcon from '../AppIcon'

const BaseButton=(props:ButtonBaseProps)=>{
    const btn = <button {...props} data-warden-type="button">{props.children}</button>
    const panel = props.tooltip ? <Tooltip title={props.tooltip}>{btn}</Tooltip> : btn
    return(
        <>
        {panel}
        </>
    )
}

const AppButton=(props:AppButtonProps)=>{
    const {icon,iconProps,...buttonBaseProps} = props   
    const iconElement = icon? icon : <AppIcon {...iconProps} />
    return(
        <BaseButton {...buttonBaseProps}>{buttonBaseProps.children ? buttonBaseProps.children : iconElement}</BaseButton>
    )
}


export default AppButton
export {BaseButton}