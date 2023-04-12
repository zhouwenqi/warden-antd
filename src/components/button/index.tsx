import styles from './index.less'
import { Tooltip } from 'antd'

const BaseButton=(props:ButtonBaseProps)=>{
    const btn = <button className={styles.wardenButton} {...props}>{props.children}</button>
    const panel = props.tooltip ? <Tooltip title={props.tooltip}>{btn}</Tooltip> : btn
    return(
        <>
        {panel}
        </>
        
    )
}

const AppButton=(props:AppButtonProps)=>{
    return(
        <BaseButton {...props}>{props.children ? props.children : props.icon}</BaseButton>
    )
}
export default AppButton
export {BaseButton}