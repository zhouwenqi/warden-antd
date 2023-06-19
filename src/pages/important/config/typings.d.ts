declare namespace Config {
    interface ConfigData{
        appName:string;
        domain:string;
        serverUrl:string;
        serverAfter:'http://'|'https://'
        appDescription?:string;
        appIcon?:string;
        isVerifyCode:boolean;
        appDisable:boolean;
        loginFaildLimit:number;
        messageChannel:MessageChannel[];
        safeLevel:0|30|60|90;
    }
    enum MessageChannel {
        Sms,
        App,
        Website,
        System
    }
}