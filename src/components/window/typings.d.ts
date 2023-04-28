import { DrawerProps } from "antd";

declare interface WindowProps extends DrawerProps {
    closeOpenHandler?:React.Dispatch<React.SetStateAction<boolean>>
}