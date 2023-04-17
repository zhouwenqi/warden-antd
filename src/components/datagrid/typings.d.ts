import { TableProps } from "antd";
declare interface DataGridProps<RecordType extends object = any> extends TableProps<RecordType> {
    toolBarProps?:DataGridToolbarProps
    headerElement?:JSX.Element
}
declare interface DataGridToolbarProps {
    leftButtons?:JSX.Element[]    
}
declare interface DataGridSearchPanelProps {
    filterElements?:JSX.Element[]
}