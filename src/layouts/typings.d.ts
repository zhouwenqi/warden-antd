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
      isBigLogo: boolean;
      shadow:boolean;
    };
    type LogoPanelProps = {
      collapsed: boolean;
      title?: string;
      logoTheme: LogoTheme;
      isBigLogo: boolean;
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
declare interface WardenBaseProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{

}
declare interface ContainerProps extends WardenBaseProps {
    children:React.ReactNode,
    isBreadcrumb:boolean,
}
