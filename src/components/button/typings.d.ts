declare interface ButtonBaseProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?:JSX.Element
}
declare interface AppButtonProps extends ButtonBaseProps {
    iconName?:string
    icon?:JSX.Element
}