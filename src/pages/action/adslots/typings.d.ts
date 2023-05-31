declare interface AdslotsData {
    id:number;
    code:string;
    name:string;
    width:number;
    height:number;
    slotsType:SoltsType;
    quantity:number;
    enabled:boolean;
    terminal:Warden.TerminalType;
    appType:Warden.AppType;
    description?:string;    
    createDate?:string;
    modifyDate?:string;
}
declare enum SoltsType {
    Image,
    Video,
    Text
}