import { DrawerProps } from "antd";
declare interface BaseWindowProps extends DrawerProps{
    closeWindowHandler?:React.Dispatch<React.SetStateAction<boolean>>;
}
declare interface WindowProps extends BaseWindowProps {
    
}