declare interface SearchBoxProps {
    /** 查询字段属性列表 */
    searchPropertyItems?:IProperty[];
    /** 黑认当前选中字段 */
    selectItem?:IProperty;
    /** 默认当前选中索引 */
    selectIndex?:number;
    /** 查询按钮类型 */    
    searchButtonType?:"text"|"icon";
    /** 查询按钮Antd风格 */
    searchButtonTheme?:"default"|"primary";
    /** 重置按钮类型 */
    resetButtonType?:"text"|"icon";
    /** 查询事件 */
    onSearch?:Function
}