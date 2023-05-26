
declare interface SmsData {
    id:number,
    templateCode:string;
    mobile:string;
    smsType:string;
    smsContent:string;
    terminal:Warden.TerminalType;
    appType:Warden.AppType; 
    sendTime?:string;
}