import { useIntl,useModel } from 'umi';
import { Tooltip,Layout,Menu,MenuProps } from 'antd';
import AppIcon from '@/components/AppIcon';
/**
 * Logo面版
 * @param props 
 * @returns 
 */
 const LogoPanel = (props: LayoutProps.LogoPanelProps) => {  
    const { initialState } = useModel('@@initialState')
    const config = initialState?.config    
    const intl = useIntl();
    // logo title
    const title = props.collapsed ? undefined : (
      <h3 className='title'>
        {props.title ? props.title : intl.formatMessage({ id: 'app.title' })}
      </h3>
    )
    

    // logo style
    const logoWidth = props.collapsed ? 18 : (props.logoSize == 'Max' ? 90 : 24);
    const placement = logoWidth > 24 ? 'leftBottom' : 'topRight'
    let logoStyle = props.logoSize == 'Max' && !props.collapsed ? 'warden-logo-max-panel' : 'warden-logo-panel'
    let maskColor = config?.mainLayout == 'DarkLeft' ? 'var(--ant-primary-color)' : 'White'
    const maskPanel = props.logoSize == 'Max' && config?.logo.isMaskadorn && !props.collapsed ? <AppIcon name="logoWhiteMask" color={maskColor} size={240} style={{position:'absolute', left:'0px'}} /> : undefined  
    let logoTheme:LayoutProps.LogoTheme = props.logoTheme    
    if(config?.mainLayout == 'DarkTop' && props.logoSize == 'Max' && !props.collapsed){
      logoTheme = 'White'
    }
    switch(logoTheme){
        case 'White':
            logoStyle +=  ' warden-logo-white'
            break
        case 'Primary':
            logoStyle += ' warden-logo-primary'
            break;
        case 'Active':
            logoStyle +=' warden-logo-active'
            break
          case 'Dark':
            logoStyle += ' warden-logo-dark'
            break
    }
    
    let logoElement = undefined
    if(config?.logo.iconName){
      logoElement = <AppIcon name="logo" size={logoWidth} />
    }else if(config?.logo.path){
      logoElement = <img src={config.logo.path} style={{width:logoWidth,height:logoWidth}} />
    }    
    return (
      <>
        <div className={logoStyle}>
          <Tooltip
            placement={placement}
            title={intl.formatMessage({ id: 'app.title' })}
          >
            <a className="icon">
              {logoElement}
            </a>            
          </Tooltip>          
          {title}
          {maskPanel}
        </div>
      </>
    );
}
LogoPanel.defaultProps = {
    logoSize:'Normal',
    logoTheme:'White',
    collapsed:false
}
export default LogoPanel