import styles from './index.less';

/**
 * 通用面版
 * @param props 
 * @returns 
 */
const Panel=(props:PanelBaseProps)=>{
    return(
        <div className={styles.panelBox} style={props.style}>
            {props.titleElement}
            {props.children}
        </div>
    )
}

/**
 * 带标题样式的面版
 * @param props 
 * @returns 
 */
const WardenPanel=(props:WardenPanelProps)=>{
    const titlePanel = (
        <div className={styles.panelTitle}>
            <label>{props.title}</label>
            {props.moreElement}
        </div>
    )
    return(
        <Panel titleElement={titlePanel} style={props.style}>
            <div className={styles.panelBody}>
                {props.children}
            </div>
        </Panel>
    )
}

export default Panel
export {WardenPanel}