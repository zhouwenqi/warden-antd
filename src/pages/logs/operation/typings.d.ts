declare interface OperationData{
    id:number;
    name:string;
    action:string;
    face?:string;
    content?:string | JSX.Element;
    ip?:string;
    terminal:Warden.TerminalType;
    appType:Warden.AppType;   
    createDate?:string;
    modifyDate?:string;
}
