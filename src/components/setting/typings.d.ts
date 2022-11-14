/** 登录布局参数类型 */
declare type LoginLayoutGroupProps = {
    layout: Warden.LoginLayoutType;
    onSelect: Function;
}
/** 主体布局参数类型 */
declare type MainLayoutGroupProps = {
    layout: Warden.MainLayoutType;
    onSelect: Function;
}
/** 主题色选择组件列表参数 */
declare type ColorBoxGroupProps = {
    onSelect: Function;
    color: string;
}

/** 颜色选择组件参数 */
declare interface ColorBoxProps extends Warden.ITheme {
    selected?: boolean;
    onSelectItem: Function;
}

/** 国际化语言参数 */
 declare type LanguageGroupProps = {
    onChange: Function;
    value: string;
}

/** Logo样式选择参数 */
declare type LogoStyleGroupProps = {
    onChange: Function;
    value: string;
    data:Ioption[];
}

/** Logo大小选择参数 */
declare type LogoSizeGroupProps = {
    onChange: Function;
    value: string;
    data:Ioption[];
}