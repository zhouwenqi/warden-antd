import { TableProps } from "antd";
import { ColumnsType } from "antd/es/table";

/**
 * 数据集属性
 */
declare interface DataGridProps<RecordType extends object = any> extends TableProps<RecordType> {
    /** 工具栏属性 */
    toolBarProps?:DataGridToolbarProps;
    /** 查询面版属性 */
    searchBarProps?:DataGridSearchPanelProps;
    
    extElements?:JSX.Element
}


/**
 * 数据集工具栏属性
 */
declare interface DataGridToolbarProps {
    /** 左侧button列表组件 */
    leftButtons?:JSX.Element[];
    /** 显示刷新按钮 */
    refreshButtonShow?:boolean;
    /** 显示删除按钮 */
    deleteButtonShow?:boolean;
    /** 显示导出按钮 */
    exportButtonShow?:boolean;
    /** 显示设置列按钮 */
    setupColumnsButtonShow?:boolean;
    /** 显示设置行高按钮 */
    setupRowHeightButtonShow?:boolean;
    /** 选中行key */
    selectedRowKeys?:React.Key[];
    /** 刷新事件 */
    onRefresh?:Function;
    /** 导出事件 */
    onExport?:Function;
    /** 删除事件 */
    onDelete?:(selectKeys:React.Key[])=>void;
    /** 原型列数据 */
    columns?:ColumnsType<any>;
    /** 设置列事件 */
    onSetupColumns?:(columns:DataGridColumnType[])=>void
    /** 设置行高事件 */
    onSetRowheightType?:(type:string)=>void
}

/**
 * 数据集查询面版属性
 */
declare interface DataGridSearchPanelProps extends SearchBoxProps {
    /** 查询关键词属性列表 */
    filterFormItems?:JSX.Element[];
    /** 显示重置按钮 */
    resetButtonShow?:boolean;
}

declare interface DataGridColumnType {
    key:string;
    itemIndex:number;
    visible:boolean;
}