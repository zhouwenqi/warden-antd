declare interface VisitData{
    uuid:string;
    uid:string;
    ip:string;
    page:string;
    terminal:Warden.TerminalType;
    appType:Warden.AppType;    
    time:string;
}


declare type VistChartType = 'Terminal' | 'Application'