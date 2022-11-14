declare namespace LayoutProps {
    type MainLayoutProps = {
      children: React.ReactElement;
    };
    type LeftProps = {
      menuData: any[];
      selectedKeys: string[];
      openerKeys: string[];
      menuTheme: MenuTheme;    
      logoTheme: LogoTheme;
      logoSize?: LogoSize;
      shadow:boolean;
    };
    type LogoPanelProps = {
      collapsed: boolean;
      title?: string;
      logoTheme: LogoTheme;
      logoSize: LogoSize;
    };
    type HeadProps = {
      menuData: any[];
      selectedKeys: string[];
      menuTheme: MenuTheme;
      logoTheme:LogoTheme;
      showLogo:boolean;
      shadow:boolean;
    };
    type MenuTheme = 'WhiteLine' | 'WhiteBlock' | 'DarkBox';
    type LogoSize = 'Mini' | 'Normal' | 'Max'
    type LogoTheme = 'White' | 'Primary' | 'Active' | 'Dark'
  }
  