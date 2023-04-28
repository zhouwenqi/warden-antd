declare interface VisitData{
    uuid:string;
    uid:string;
    ip:string;
    page:string;
    terminal:Warden.TerminalType;
    appType:Warden.AppType;    
    time:string;
}
declare interface VisitChartWindowProps {
    open:boolean;
    closeWindowHandler:React.Dispatch<React.SetStateAction<boolean>>,
}
declare type VistChartType = 'Terminal' | 'Application'