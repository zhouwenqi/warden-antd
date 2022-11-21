import './Container.less';
import {useOutletContext} from 'umi';
/**
 * Page 容器
 * @returns 
 */
const Container=(props:ContainerProps)=>{    
    const parentContext = useOutletContext<{breadcrumb:JSX.Element}>()
    const breadcrumbPanel = props.isBreadcrumb ? parentContext.breadcrumb : <></>
    return(
        <>
        {breadcrumbPanel}
        <div className="warden-container" {...props}>
            {props.children}
        </div>
        </>
    )
}
Container.defaultProps = {
    isBreadcrumb:true
}
export default Container;