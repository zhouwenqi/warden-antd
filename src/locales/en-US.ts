import components from './en-US/components';
import menus from './en-US/menus';
import titles from './en-US/titles';
import pages from './en-US/pages';
export default {
  'app.name': 'Warden',
  'app.title': 'Warden Management System',
  'app.copyright.info': 'Powered by 2022 © warden.vip',
  'config.setting.drawer.title': 'Interface configuration',
  'config.setting.login.layout.title': 'Login layout',
  'config.setting.main.layout.title': 'Main layout',
  'config.setting.theme.color.title': 'Theme color',
  'config.layout.login.normal': 'Normal layout',
  'config.layout.login.card': 'Card layout',
  'config.layout.login.screen': 'Screen layout',
  'config.layout.main.dark.top': 'Dark on the top',
  'config.layout.main.dark.left': 'Dark on the left',
  'config.layout.main.light.layout': 'Light layout',
  'config.setting.language.title': 'Language',
  'config.theme.color.blue': 'Blue',
  'config.theme.color.red': 'Red',
  'config.theme.color.orange': 'Orange',
  'config.theme.color.yellow': 'Yellow',
  'config.theme.color.cyan': 'Cyan',
  'config.theme.color.green': 'Green',
  'config.theme.color.pink': 'Pink',
  'config.theme.color.purple': 'Purple',
  'config.setting.alert.title': 'Configuraton notes',
  'config.setting.splitmenu.title': 'Split menu',
  'config.setting.breadcrumb.title':'Enable breadcrumb',
  'config.setting.layoutshadow.title':'Layout shadow',
  'config.setting.logo.outstand.title':'Logo outstand',
  'config.setting.logo.big.title':'Big logo',
  'config.setting.alert.message':
    'The configuration bar is only used for preview in the development environment. The production environment will not be enabled by default. Please modify the configuration parameters manually.',
  'config.setting.button.copy': 'Copy configuration...',
  'config.setting.copy.success':
    'copy success, please replace defaultConfig in src/config/defaultConfig.ts',
  'error.page.404.message': 'Sorry, the page you visited does not exist.',
  'error.page.403.message':
    'Sorry, you are not authorized to access this page.',
  'error.page.back.button': 'Back Home',
  'tooltip.more':'More',
  ...components,
  ...menus,
  ...titles,
  ...pages,
};
