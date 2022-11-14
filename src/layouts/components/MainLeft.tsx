
import { history } from 'umi';
import { Layout,Menu,MenuProps } from 'antd';
import React,{ useEffect,useRef,useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import LogoPanel from './LogoPanel';
import './MainLeft.less';

const { Sider } = Layout;
const collapsedWidth = 48;
const sliderWidth = 240;

const MainLeft=(props:LayoutProps.LeftProps) => {
  const defaultOpenKeysRef = useRef<string[]>([]);
  defaultOpenKeysRef.current = props.openerKeys;
  const [openKeys, setOpenKeys] = useState(props.openerKeys);
  const [collapsed, setCollapsed] = React.useState(false)
   // 菜单缩进按钮
   const CollapsedMenu: JSX.Element = (
    <div style={{ display: 'block', textAlign: 'right', paddingRight: '16px' }}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )  

  // 菜单折叠切换
  const collapsedToggle=(clientWidth:number)=>{
    if(global.isHandFold){
      return
    }
    if(clientWidth<1200 && !collapsed){
      setCollapsed(true)
    }
    if(clientWidth>=1200 && collapsed){
      setCollapsed(false)
      global.isHandFold = false
    }
  }

  // 手动折叠
  const onHandCollapse=(value:boolean)=>{
    setCollapsed(value)
    
      global.isHandFold = value
    
  }

  useEffect(() => {
    if (openKeys != props.openerKeys) {      
      setOpenKeys(props.openerKeys)
    }    
    collapsedToggle(document.body.clientWidth)
  }, [props.openerKeys])

  // 菜单点击事件
  const onMenuClick: MenuProps['onClick'] = (e) => {
    history.push(e.key)  
  }

  // window改变大小事件
  const windowResizeHandler=()=>{    
    collapsedToggle(document.body.clientWidth)       
  }
  React.useEffect(()=>{
    window.addEventListener('resize',windowResizeHandler)  
    return ()=>{
      window.removeEventListener('resize',windowResizeHandler)
    }
  },[collapsed])
  
    let siderStyle = 'warden-layout-sider'
    siderStyle += props.menuTheme === 'DarkBox' ? ' warden-layout-sider-primary' : ' warden-layout-sider-white'    
    let boxStyle = props.menuTheme === 'WhiteLine' || props.menuTheme === 'WhiteBlock' ? 'warden-layout-left-white' : ''
    if(props.shadow){
      siderStyle += props.menuTheme == 'DarkBox' ? ' warden-layout-sider-dark-shadow' : ' warden-layout-sider-white-shadow';
    }

    const antTheme = props.menuTheme === 'DarkBox' ? 'dark' : 'light'
    // 强迫症补正顶部和左侧菜单主题一致时，菜单顶部间距暇疵
    if((props.logoTheme == 'Primary' && props.menuTheme=='DarkBox') || (props.logoTheme == 'White' && props.menuTheme!='DarkBox')){
      boxStyle += ' warden-layout-left-splice'
    }

    console.log('left-logo-size:'+props.logoSize)
    return(
        <>
            <div
            style={{
            width: collapsed ? collapsedWidth : sliderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? collapsedWidth : sliderWidth}px`,
            maxWidth: collapsed ? collapsedWidth : sliderWidth,
            minWidth: collapsed ? collapsedWidth : sliderWidth,
            transition:
                'background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
            }}
            ></div>
            <Sider
            theme={antTheme}
            collapsedWidth={collapsedWidth}
            className={siderStyle}
            collapsible
            trigger={CollapsedMenu}
            collapsed={collapsed}
            onCollapse={onHandCollapse}
            width={sliderWidth}
            style={{
            position: 'fixed',
            zIndex: '100',
            height: '100%',
            }}
            >
                <LogoPanel logoTheme={props.logoTheme} collapsed={collapsed} logoSize={props.logoSize} />
                <div className={'warden-layout-left-box ' + boxStyle}>
                <Menu
                    onOpenChange={(e) => {
                      setOpenKeys(e);
                    }}
                    onClick={onMenuClick}
                    items={props.menuData}
                    openKeys={openKeys}
                    defaultOpenKeys={defaultOpenKeysRef.current}
                    selectedKeys={props.selectedKeys}
                    mode="inline"
                    theme={antTheme}
                    style={{ height: '100%' }}
                ></Menu>
                </div>
            </Sider>
        </>
    )
}
MainLeft.defaultProps = {
  shadow:false
}

export default MainLeft;