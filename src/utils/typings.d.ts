declare type IconType = 'ant' | 'warden' | 'svg' | 'img';
/** 菜单 */
declare interface IMenuData {
    key:string;
    path:string;
    name:string;
    locale?:boolean;
    iconName?:string;
    icon?: React.ReactNode;
    items?: IMenuData[];
}
declare interface IAntMenuData {
    key:string;
    label:string;
    theme?:string;
    icon?: React.ReactNode;
    children?:IAntMenuData[];
}