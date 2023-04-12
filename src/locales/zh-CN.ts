import components from './zh-CN/components';
import menus from './zh-CN/menus';
import titles from './zh-CN/titles';
import pages from './zh-CN/pages';
export default {
  'app.name': '沃登',
  'app.title': '沃登后台管理系统',
  'app.copyright.info': 'Powered by 2022 © warden.vip',
  'config.setting.drawer.title': '界面配置',
  'config.setting.login.layout.title': '登录页布局',
  'config.setting.main.layout.title': '主体布局',
  'config.setting.theme.color.title': '主题颜色',
  'config.layout.login.normal': '默认布局',
  'config.layout.login.card': '卡片布局',
  'config.layout.login.screen': '场景布局',
  'config.layout.main.dark.top': '深色顶部',
  'config.layout.main.dark.left': '深色左侧',
  'config.layout.main.light.layout': '整体高亮',
  'config.setting.language.title': '语言',
  'config.theme.color.blue': '蓝色',
  'config.theme.color.red': '红色',
  'config.theme.color.orange': '橙色',
  'config.theme.color.yellow': '黄色',
  'config.theme.color.cyan': '青色',
  'config.theme.color.green': '绿色',
  'config.theme.color.pink': '粉色',
  'config.theme.color.purple': '紫色',
  'config.setting.alert.title': '配置说明',
  'config.setting.splitmenu.title': '分隔菜单',
  'config.setting.breadcrumb.title':'启用面包屑',
  'config.setting.layoutshadow.title':'布局阴影',
  'config.setting.logo.outstand.title':'突出标志',
  'config.setting.logo.big.title':'展示大标志',
  'config.setting.alert.message':
    '配置栏只有开发环境中用于预览，生产环境默认不会开启，请手动修改配置参数。',
  'config.setting.button.copy': '拷贝配置',
  'config.setting.copy.success':
    '拷贝成功, 请替换src/config/defaultConfig.ts中的defaultConfig配置',
  'error.page.404.message': '很抱歉，您访问的页面不存在。',
  'error.page.403.message': '很抱歉，您没有权限访问此页面。',
  'error.page.back.button': '返回首页',
  'tooltip.more':'更多',
  'global.button.view':'查看',
  ...components,
  ...menus,
  ...titles,
  ...pages,
};
