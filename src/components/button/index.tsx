import styles from './index.less'

const BaseButton=(props:ButtonBaseProps)=>{
    return(
        <button className={styles.wardenButton} {...props}>{props.children}</button>
    )
}
const AppButton=(props:AppButtonProps)=>{
    return(
        <BaseButton {...props}>{props.children ? props.children : props.icon}</BaseButton>
    )
}
export default AppButton
export {BaseButton}