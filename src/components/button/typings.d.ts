declare interface ButtonBaseProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?:JSX.Element;
    tooltip?:string;
}

declare interface AppButtonProps extends ButtonBaseProps {
    iconProps?:AppIconProps;
    icon?:JSX.Element;
}
