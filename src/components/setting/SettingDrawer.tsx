import React, { useState } from 'react';
import {getLocalUser} from '@/utils/stringUtils';
import {
  Drawer,
  Button,
  Space,
  Avatar,
  Tooltip,
  ConfigProvider,
  Radio,
  Alert,
  Switch,
  Segmented,
  message,
  Divider,
} from 'antd';
import styles from './SettingDrawer.less';
import AppIcon from '../AppIcon';
import { CopyOutlined } from '@ant-design/icons';

import { useIntl, setLocale, useModel, getLocale } from 'umi';
import { ThemeColors,Languages } from './ConfigData';
import copy from 'copy-to-clipboard';

/**
 * Drawer - 布局设置抽屉组件
 *
 * 只有在测试环境下才使用
 * @returns
 */
const SettingDrawer = () => {
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  const config = initialState?.config;
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<string>(getLocale());
  const [isBreadcrumb,setIsBreadcrumb] = useState<boolean>(config?.isBreadcrumb!)
  const [isSplitMenu,setIsSplitMenu] = useState<boolean>(config?.isSplitMenu!)
  const [isLayoutShadow,setIsLayoutShadow] = useState<boolean>(config?.isLayoutShadow!)
  const [isOutstand,setIsOutstand] = useState<boolean>(config?.logo.isOutstand!)
  const [isBigLogo,setIsBigLogo] = useState<boolean>(config?.logo.isBigLogo!)
  /**
   * 选择登录布局事件
   * @param e 登录布局类型
   */
  const onLoginLayoutChangeHandler = (e: Warden.LoginLayoutType) => {
    console.log(e);
    setInitialState((preInitialState) => {
      return {
        ...preInitialState,
        config: { ...config!, loginLayout: e },
      };
    });
  };

  /**
   * 选择主体布局
   * @param e 主体布局类型
   */
  const onMainLayoutChangeHandler = (e: Warden.MainLayoutType) => {
    setInitialState((preInitialState) => {
      return {
        ...preInitialState,
        config: { ...config!, mainLayout: e },
      };
    });
  };
  /**
   * 选择主题颜色
   * @param color 颜色值
   */
  const onThemeColorChangeHandler = (color: string) => {
    ConfigProvider.config({
      theme: {
        primaryColor: color,
      },
    });
    setInitialState((preInitialState) => {
      return {
        ...preInitialState,
        config: { ...config!, themeColor: color },
      };
    });
  };

  /**
   * 高亮Logo
   * @param e 是否高亮
   */
  const onChangeOutstandMenuHandler = (e: boolean) => {
    setIsOutstand(e)
    const logo = {...config?.logo,isOutstand:e}   
    setInitialState(() => {
      return {
        config: { ...config!, logo:logo },
      }
    })
  };

  /**
   * 是否展示大Logo
   * @param e 
   */
  const onChangeBigLogoHandler = (e: boolean) => {
    setIsBigLogo(e)
    const logo = {...config?.logo,isBigLogo:e}   
    setInitialState(() => {
      return {
        config: { ...config!, logo:logo },
      }
    })
  };

  /**
   * 设置面包屑菜单
   * @param e 是否启用
   */
   const onChangeBreadcrumbHandler = (e: boolean) => {
    setIsBreadcrumb(e)
    setInitialState((preInitialState) => {
      return {
        ...preInitialState,
        config: { ...config!, isBreadcrumb: e },
      };
    });
  };

  /**
   * 设置布局阴影
   * @param e 是否启用
   */
   const onChangeLayoutShadowbHandler = (e: boolean) => {
    setIsLayoutShadow(e)
    setInitialState((preInitialState) => {
      return {
        ...preInitialState,
        config: { ...config!, isLayoutShadow: e },
      };
    });
  };

  /**
   * 分隔菜单
   * @param e 是否分隔
   */
   const onChangeSplitMenuHandler = (e: boolean) => {
    setIsSplitMenu(e)
    setInitialState((preInitialState) => {
      return {
        ...preInitialState,
        config: { ...config!, isSplitMenu: e },
      };
    });
  };

  /**
   * 切换国际化语言
   * @param e 语言
   */
  const onChangeLangageHandler = (e: string) => {
    setLanguage(e)
    setLocale(e, false)
    // (伪代码)用户信息国际化                           
    global.currentUser = getLocalUser(e)
    setInitialState(() => {
      // 清除菜单数据（菜单做了缓存，需要重新国际化）
      global.menus = [] 
      return {
        config: { ...config!, language: e }
      }
    })
  }


  /** 拷贝配置 */
  const onCopyHandler = () => {
    copy(JSON.stringify(config))
    message.success(intl.formatMessage({ id: 'config.setting.copy.success' }))
  };

  /**
   * 打开抽屉
   */
  const showDrawer = () => {
    setOpen(true);
  }

  /**
   * 关闭抽屉
   */
  const onClose = () => {
    setOpen(false);
  }
  return (
    <>
       <div className={styles.btnAffix} onClick={showDrawer}>
          <Avatar
            className={styles.btnBox}
            icon={<AppIcon name="setup" size={24} color="#444444" />}
            size={44}
          />
        </div>
        <Drawer
          title={intl.formatMessage({ id: 'config.setting.drawer.title' })}
          placement="right"
          width={400}
          onClose={onClose}
          open={open}
          footer={
            <Space>
              <Button
                onClick={onCopyHandler}
                icon={<CopyOutlined />}
                type="primary"
              >
                {intl.formatMessage({ id: 'config.setting.button.copy' })}
              </Button>
            </Space>
          }
        >
          <div className={styles.panelTitle}>
            <label>
              {intl.formatMessage({ id: 'config.setting.login.layout.title' })}
            </label>
          </div>
          <div className={styles.panelBox}>
            <LoginLayoutGroup
              layout={config!.loginLayout}
              onSelect={onLoginLayoutChangeHandler}
            />
          </div>
          <div className={styles.panelTitle}>
            <label>
              {intl.formatMessage({ id: 'config.setting.main.layout.title' })}
            </label>
          </div>
          <div className={styles.panelBox}>
            <MainLayoutGroup
              layout={config!.mainLayout}
              onSelect={onMainLayoutChangeHandler}
            />
          </div>
          <div className={styles.panelTitle}>
            <label>
              {intl.formatMessage({ id: 'config.setting.theme.color.title' })}
            </label>
          </div>
          <div className={styles.panelBox}>
            <ColorBoxGroup
              color={config!.themeColor}
              onSelect={onThemeColorChangeHandler}
            />
          </div>         
          <div className={styles.panelTitle}>
            <label>
              {intl.formatMessage({ id: 'config.setting.language.title' })}
            </label>            
          </div>
          <div className={styles.panelBox}>
            <LanguageGroup value={language} onChange={onChangeLangageHandler} />
          </div>
          <Divider />
          <div className={styles.panelItem}>
            <label>
              {intl.formatMessage({ id: 'config.setting.breadcrumb.title' })}
            </label>
            <Switch defaultChecked={isBreadcrumb} onChange={onChangeBreadcrumbHandler} />
          </div>          
          <div className={styles.panelItem}>            
            <label>
              {intl.formatMessage({ id: 'config.setting.splitmenu.title' })}
            </label>
            <Switch defaultChecked={isSplitMenu} onChange={onChangeSplitMenuHandler} />
          </div>
          
          <div className={styles.panelItem}>
            <label>
              {intl.formatMessage({ id: 'config.setting.layoutshadow.title' })}
            </label>
            <Switch defaultChecked={isLayoutShadow} onChange={onChangeLayoutShadowbHandler} />
          </div>   
          <div className={styles.panelItem}>
            <label>
              {intl.formatMessage({ id: 'config.setting.logo.outstand.title' })}
            </label>
            <Switch defaultChecked={isOutstand} onChange={onChangeOutstandMenuHandler} />
          </div>              
          <div className={styles.panelItem}>
            <label>
              {intl.formatMessage({ id: 'config.setting.logo.big.title' })}
            </label>
            <Switch defaultChecked={isBigLogo} onChange={onChangeBigLogoHandler} />
          </div>         
          <div style={{margin:'20px 0px'}}>
            <Alert
              message={intl.formatMessage({
                id: 'config.setting.alert.message',
              })}
              type="warning"
            />
          </div>
        </Drawer>
    </>
  );
};


/**
 * 登录布局选择
 * @param props 登录布局参数
 * @returns
 */
const LoginLayoutGroup = (props: LoginLayoutGroupProps) => {
  const intl = useIntl();
  let itemStyle1 = styles.layoutBoxItem + ' ' + styles.layoutNormal;
  let itemStyle2 = styles.layoutBoxItem + ' ' + styles.layoutCard;
  let itemStyle3 = styles.layoutBoxItem + ' ' + styles.layoutScreen;
  switch (props.layout) {
    case 'Card':
      itemStyle2 += ' ' + styles.itemChecked;
      break;
    case 'Screen':
      itemStyle3 += ' ' + styles.itemChecked;
      break;
    case 'Normal':
    default:
      itemStyle1 += ' ' + styles.itemChecked;
      break;
  }

  return (
    <>
      <div className={styles.layoutBoxGroup}>
        <Tooltip
          title={intl.formatMessage({ id: 'config.layout.login.normal' })}
        >
          <div
            className={itemStyle1}
            onClick={() => {
              props.onSelect('Normal');
            }}
          >
            <AppIcon name="checked" size={14} />
          </div>
        </Tooltip>
        <Tooltip title={intl.formatMessage({ id: 'config.layout.login.card' })}>
          <div
            className={itemStyle2}
            onClick={() => {
              props.onSelect('Card');
            }}
          >
            <AppIcon name="checked" size={14} />
          </div>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({ id: 'config.layout.login.screen' })}
        >
          <div
            className={itemStyle3}
            onClick={() => {
              props.onSelect('Screen');
            }}
          >
            <AppIcon name="checked" size={14} />
          </div>
        </Tooltip>
      </div>
    </>
  );
};



/**
 * 主体布局选择
 * @param props 主体布局参数
 * @returns
 */
const MainLayoutGroup = (props: MainLayoutGroupProps) => {
  const intl = useIntl();
  let itemStyle1 = styles.layoutBoxItem + ' ' + styles.layoutDarkTitle;
  let itemStyle2 = styles.layoutBoxItem + ' ' + styles.layoutDarkMenu;
  let itemStyle3 = styles.layoutBoxItem + ' ' + styles.layoutLightTitleAndMenu;
  switch (props.layout) {
    case 'DarkLeft':
      itemStyle2 += ' ' + styles.itemChecked;
      break;
    case 'LightLayout':
      itemStyle3 += ' ' + styles.itemChecked;
      break;
    case 'DarkTop':
    default:
      itemStyle1 += ' ' + styles.itemChecked;
      break;
  }

  return (
    <>
      <div className={styles.layoutBoxGroup}>
        <Tooltip
          title={intl.formatMessage({ id: 'config.layout.main.dark.top' })}
        >
          <div
            className={itemStyle1}
            onClick={() => {
              props.onSelect('DarkTop');
            }}
          >
            <AppIcon name="checked" size={14} />
          </div>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({ id: 'config.layout.main.dark.left' })}
        >
          <div
            className={itemStyle2}
            onClick={() => {
              props.onSelect('DarkLeft');
            }}
          >
            <AppIcon name="checked" size={14} />
          </div>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({ id: 'config.layout.main.light.layout' })}
        >
          <div
            className={itemStyle3}
            onClick={() => {
              props.onSelect('LightLayout');
            }}
          >
            <AppIcon name="checked" size={14} />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

/**
 * 语言选择器
 * @param props 
 * @returns 
 */
const LanguageGroup = (props: LanguageGroupProps) => {
  let options: any[] = [];
  Languages.forEach((region, index) => {
    options.push({
      label: region.name,
      value: region.language,
    })
  })

  return (
    <>
      <Segmented
        options={options}
        defaultValue={props.value}
        onChange={(e) => {
          props.onChange(e);
        }}
      />
    </>
  );
};


/**
 * 主题颜色选择器
 * @param props 颜色选择参数
 * @returns
 */
const ColorBoxGroup = (props: ColorBoxGroupProps) => {
  let elements: JSX.Element[] = [];
  const intl = useIntl();
  // 初始化主题
  ThemeColors.forEach((item, index) => {
    item.name = intl.formatMessage({ id: item.id });
    elements.push(
      <ColorBox
        selected={item.color == props.color}
        key={'coloritem' + index}
        color={item.color}
        name={item.name}
        onSelectItem={(color: string) => {
          props.onSelect(color);
        }}
      />,
    );
  });
  return (
    <>
      <div className={styles.colorBoxGroup}>{elements}</div>
    </>
  )
}

/**
 * 颜色组件
 * @param props 
 * @returns 
 */
const ColorBox = (props: ColorBoxProps) => {
  let cls = styles.colorBoxItem;
  if (props.selected) {
    cls += ' ' + styles.colorBoxSelected;
  }
  const sty = {
    backgroundColor: props.color,
  }
  return (
    <Tooltip title={props.name}>
      <label
        onClick={() => {
          props.onSelectItem(props.color);
        }}
        className={cls}
        style={sty}
      >
        <AppIcon name="checked" size={12} />
      </label>
    </Tooltip>
  )
}

/**
 * Logo大小选择器
 * @param props 
 * @returns 
 */
const LogoSizeGroup=(props:LogoSizeGroupProps)=>{
  return (
    <>
      <Segmented
        options={props.data}
        defaultValue={props.value}
        onChange={(e) => {
          props.onChange(e);
        }}
      />
    </>
  )
}

export default SettingDrawer;
