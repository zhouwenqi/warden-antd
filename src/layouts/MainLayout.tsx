import { Link, Outlet,useLocation} from 'umi';
import './MainLayout.less';
import {Breadcrumb, Layout,BreadcrumbItemProps} from 'antd';
import MainHead from './components/MainHead';
import MainLeft from './components/MainLeft';
import { useModel } from 'umi';
import SettingDrawer from '@/components/setting/SettingDrawer';
import { getAntdMenus, getBreadcrumbData, getMapMenus, getSplitAntdMenus } from '@/utils/menuUtils';
import { matchPathToKeys } from '@/utils/routeUtils';
import { Content, Footer } from 'antd/lib/layout/layout';

/**
 * 主控制台布局
 * @returns 
 */
export default function MainLayout() {
  const location = useLocation()  
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  const config = initialState?.config
  const menuKeys = matchPathToKeys(location.pathname)
  const breadcrumbData = getMapMenus(menuKeys)
  let selectLeftKeys:string[] = []
  let selectTopKeys:string[] = []
  let antdMenuData = getAntdMenus(global.menus)
  let headMenus:IAntMenuData[] = []
  let leftMenus:IAntMenuData[] = []

  // 顶部样式
  let headTheme: LayoutProps.MenuTheme = 'WhiteLine'
  // 左侧样式
  let leftTheme: LayoutProps.MenuTheme = 'DarkBox'
  // logo样式
  let logoTheme:LayoutProps.LogoTheme = 'White'
  switch(config!.mainLayout){
    case 'DarkTop':
      headTheme = 'DarkBox'
      leftTheme = 'WhiteLine'
      selectTopKeys = menuKeys
      headMenus = antdMenuData || []
      logoTheme = config?.logo.isOutstand ? 'Dark' : 'Primary'
      break
    case 'DarkLeft':
      headTheme = 'WhiteLine'
      leftTheme = 'DarkBox'
      selectLeftKeys = menuKeys
      leftMenus = antdMenuData || []
      logoTheme = config?.logo.isOutstand ? 'Active' : 'Primary'
      break
    case 'LightLayout':
    default:
      headTheme = config?.isSplitMenu ? 'WhiteBlock' : 'WhiteLine'
      headMenus = antdMenuData || []
      leftTheme = 'WhiteLine'
      logoTheme = config?.logo.isOutstand ? (headTheme == 'WhiteBlock' ? 'Active' : 'Primary') : 'White'
      break
  }

  if(config?.isSplitMenu && menuKeys.length > 0){
    selectTopKeys = [menuKeys[0]]
    const {rootMenus,childMenus} = getSplitAntdMenus(antdMenuData, menuKeys)
    headMenus = rootMenus
    leftMenus = childMenus
    if(menuKeys.length > 1){
      menuKeys.shift()
      selectLeftKeys = menuKeys
    }
  }  

  const operLeftKeys = selectLeftKeys
  const isLeftPanel = leftMenus.length > 0
  const leftPanel = isLeftPanel ? (
    <MainLeft
        menuData={leftMenus}
        selectedKeys={selectLeftKeys}
        openerKeys={operLeftKeys}
        menuTheme={leftTheme}
        logoTheme={logoTheme}
        isBigLogo={config?.logo.isBigLogo!}  
        shadow={config?.isLayoutShadow}
    />
  ):undefined 

  
  let BreadcrumbPanel:JSX.Element = <></>  
  if(config?.isBreadcrumb){    
    let items:JSX.Element[]=[]
    breadcrumbData.forEach((menu,index)=>{
      items.push(<Breadcrumb.Item key={'breadcrumb'+index}><Link to={menu.path}>{menu.name}</Link></Breadcrumb.Item>)
    })
    BreadcrumbPanel = (<div className="warden-breadcrumb-box"><Breadcrumb>{items}</Breadcrumb></div>)   
  }

  return (
    <>
    <div className="warden-layout-body">
      <Layout className="warden-layout-box">
        {leftPanel}
        <div className="ant-layout" style={{ position: 'relative' }}>
          <MainHead 
            showLogo={!leftPanel} 
            logoTheme={logoTheme} 
            menuTheme={headTheme} 
            menuData={headMenus} 
            selectedKeys={selectTopKeys}
            shadow={config?.isLayoutShadow} />
          <Layout className='warden-layout-content'> 
            <Content>                        
              <Outlet context={{breadcrumb:BreadcrumbPanel}} />
            </Content>
            <Footer>
              <div>Microsoft.com</div>
            </Footer>
          </Layout>                   
        </div>
        <div className='warden-layout-header-maskbar' />
      </Layout>    
    </div>
    <SettingDrawer />
    </>
  )
}
