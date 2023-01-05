import './Container.less';
import {useOutletContext} from 'umi';
/**
 * Page 容器
 * @returns 
 */
const Container=(props:ContainerProps)=>{    
    const parentContext = useOutletContext<{breadcrumb:JSX.Element,title:string}>()    
    const isBreadcrumb = props.showBreadcrumb && parentContext.breadcrumb
    let breClsName = 'warden-grid'
    let titClsName = isBreadcrumb ? 'warden-title-box1' : 'warden-title-box2'
    const titlePanel = props.showTitle ? <div className={titClsName}><label>{parentContext.title}</label></div> : <></>
    switch(props.boxStyle){
        case 'box':
            breClsName = 'warden-grid-box'            
            break
        case 'panel':
            breClsName = 'warden-grid-panel'
            break
        case 'none':
        default:
            breClsName = 'warden-grid'
            break
    }
    let styleProps = props.style
    return(
        <>    
        {isBreadcrumb ? <div className="warden-breadcrumb-box">{parentContext.breadcrumb}</div> : <></>}
        {titlePanel}
        <div className={breClsName} style={styleProps}>            
            {props.children}
        </div>
        </>
    )
}

Container.defaultProps = {
    showBreadcrumb:true,
    showTitle:false,
    background:'transparent',
    fillHeight:false,
    boxStyle:'none'
}

export default Container;