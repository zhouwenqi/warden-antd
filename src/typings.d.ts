declare namespace Warden{
    type LoginLayoutType = 'Normal' | 'Screen' | 'Card'
    type MainLayoutType = 'DarkLeft' | 'DarkTop' | 'LightLayout'

    interface IWardenConfig {
        /** 主题颜色 */
        themeColor: string;
        /** 国际化语言 */
        language: string;
        /** 登录页布局 */
        loginLayout: LoginLayoutType;
        /** 主体布局 */
        mainLayout: MainLayoutType;
        /** logo */
        logo:ILogo;
        /** 启用面包屑导航栏 */
        isBreadcrumb:boolean;
        /** 是否分隔菜单 */
        isSplitMenu:boolean;
        /** 布局阴影 */
        isLayoutShadow:boolean;
    }

    interface ILocal {
        id?: string;
    }

    interface IRegion {
        language: string;
        name: string;
        ico?: string;
    }

    /** Logo */
    interface ILogo {
        /** warden icon (需要修改AppIcon组件) */
        iconName?:string;
        /** 图片或svg */
        path?:string;
        /** 突出显示(加深背景色) */
        isOutstand?:boolean;        
        /** Logo大小 */
        sizeMode?:'Normal' | 'Max';
        /** 是否修修大Logo背景 */
        isMaskadorn?:boolean;
        /** 是否展示大logo */
        isBigLogo?:boolean;
    }

    /** 主题 */
    interface ITheme extends ILocal {
        /** 主题名称 */
        name?: string;
        /** 主题颜色 */
        color: string;
    }   

    type SysUser = {
        id:number,
        uid:string,
        nickName: string;
        deptName: string;
        deptId: number;
        postName: string;
        postId: number;
        createDate: Date;
        loginDate: Date;
        face?:string;
        roleName:string;
        authoritys: Array<string>;
        roles: Array<string>;
        isRoot?: boolean;
    }
    type TerminalType = 'MAC' | 'PC' | 'MOBILE' | 'LINUX'
    type AppType = 'ANDROID' | 'IOS' | 'WEIXIN' | 'WEB'
}