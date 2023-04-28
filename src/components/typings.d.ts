declare interface AppIconProps extends React.SVGProps<SVGSVGElement>{
    name?:string;
    size?:number;
    color?:string;
    readonly className?:string
}
declare type AppSwiperProps = {
    data: Array<IswiperItemData>;
    width?: string;
    height?: string;
    onClick?: Function;
}
declare type IswiperItemData = {
    id:number;
    src?:string;
    source:string | JSX.Element;
}
declare interface IOption {
    value:string|number
    label:string
}
declare interface AppChartProps extends React.HTMLAttributes<HTMLDivElement> {    
    ready?:Function
    finished?:Function
    option?:any
}
declare interface IProperty{
    value:string|number
    label:string
}