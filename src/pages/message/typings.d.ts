declare interface MessageData{
    id:number;
    msgType:'Notice'|'Event'|'Promotion';
    title:string;    
    content?:string;  
    isRead:boolean;
    createDate?:string;
}