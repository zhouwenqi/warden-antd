declare interface PanelBaseProps  extends React.HTMLAttributes<HTMLDivElement>{
    titleElement?:JSX.Element | string
    children?:JSX.Element
}
declare interface WardenPanelProps extends PanelBaseProps {
    title:string
    moreElement?:JSX.Element
    children?:JSX.Element
}