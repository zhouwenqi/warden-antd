import { Layout, Menu, Space, Dropdown, Avatar,Tooltip,MenuProps } from "antd";
import React from 'react';
import AppIcon from "@/components/AppIcon";
import { history, useIntl } from "umi";
import './MainHead.less';
import LogoPanel from "./LogoPanel";
const {Header} = Layout;
const MainHead =(props:LayoutProps.HeadProps)=> {
    let baseStyle = 'warden-layout-header'   
    const menus = (
        <Menu>
          <Menu.Item>rrrrwewr</Menu.Item>
          <Menu.Item>3333rrre</Menu.Item>
          <Menu.Item>3333rwerwr</Menu.Item>
        </Menu>
    )    
 
    // 菜单点击事件
    const onMenuClick: MenuProps['onClick'] = (e) => {     
      history.push(e.key) 
    }   

    let headMenuStyle = 'warden-layout-header-menu'
    // 样式
    switch(props.menuTheme){
      case 'DarkBox':
        baseStyle += ' warden-layout-header-primary'
        break
      case 'WhiteBlock':
        baseStyle += ' warden-layout-header-block'
        if(props.logoTheme == 'White'){
          headMenuStyle += ' warden-layout-header-menu-space'
        }
        break
      case 'WhiteLine':
      default:
        baseStyle += ' warden-layout-header-white'
        break
    }
    const headStyle = baseStyle
    let headBoxStyle = baseStyle + ' warden-layout-header-fixed'
    const antTheme = props.menuTheme == 'WhiteLine' ? 'light' : 'dark'    
    // logo
    const logoPanel = props.showLogo ? (<LogoPanel logoTheme={props.logoTheme} />) : undefined
    // 阴影
    if(props.shadow){
      headBoxStyle += props.menuTheme == 'DarkBox' ? ' warden-layout-header-dark-shadow' : ' warden-layout-header-white-shadow'
    }
    console.log("shadow:"+props.shadow)
    
    return(
        <>
          <Header className={headStyle}></Header>
          <Header className={headBoxStyle}>
              {logoPanel}
              <Menu className={headMenuStyle} selectedKeys={props.selectedKeys} defaultSelectedKeys={props.selectedKeys} mode="horizontal" theme={antTheme} items={props.menuData} onClick={onMenuClick}></Menu>
              <div className="warden-layout-header-toolbar">
                <Space direction="horizontal">
                    <Dropdown overlay={menus} placement="bottomRight">
                    <Space>
                        <Avatar className="warden-avatar-box" src="/images/face.png">User</Avatar>
                        <label className="warden-avatar-name">zhouwenqi</label>
                    </Space>
                    </Dropdown>
                    <a className="icon">
                        <AppIcon name="ring" size={18} />
                    </a>
                    <FullscreenButton />         
                </Space>
              </div>
          </Header>
        </>
    )
}

/** 全屏切换Button */
const FullscreenButton=()=>{
    const [fullScreen,setFullScreen] = React.useState(false)
    const domContent = React.useRef(document.body)
    const intl = useIntl()
  
    // 全屏模式切换
    const handleChangeFullscreen=()=>{
      setFullScreen(!!document.fullscreenElement)
    }
    // F11按键事件
    const handlerF11Key=(e:KeyboardEvent)=>{
      if(e.code==="F11"){
        e.preventDefault()
        onFullScreenHandler()
      }
    }
    React.useEffect(()=>{    
      document.addEventListener('fullscreenchange',handleChangeFullscreen)
      document.addEventListener('keydown',handlerF11Key,true)
      return ()=>{
        document.removeEventListener('fullscreenchange',handleChangeFullscreen)
        document.removeEventListener('keydown',handlerF11Key)
      }
    },[])
  
    // 全屏按钮点击事件
    const onFullScreenHandler=()=>{
      if(fullScreen){
        document.exitFullscreen()
      }else{
        domContent.current.requestFullscreen()
      }
    }
    const tooltipText = fullScreen ? intl.formatMessage({ id: 'head.button.tooltip.exitFullscreen' }) : intl.formatMessage({ id: 'head.button.tooltip.fullscreen' })
    return(
      <Tooltip title={tooltipText}>
      <a className="icon" onClick={onFullScreenHandler}>
        { fullScreen ? <AppIcon name="exitFullScreen" size={18} /> : <AppIcon name="fullScreen" size={18} /> }
      </a>  
      </Tooltip>
    )
  }
 MainHead.defaultProps = {
   showLogo:false,
   shadow:false
 } 
export default MainHead