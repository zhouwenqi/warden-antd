declare interface CouponBitchData {
    id:number;
    name:string;
    quantity:number;    
    denomination:string;
    where?:number;
    receiveQuantity:number;
    useQuantity:number;
    receiveMethod:'Auto'|'Active';
    couponType:'Cash'|'Discount'|'Exchange';
    receiveDate:string[];
    expireDate:string[];
    enabled:boolean;
    description?:string;
    createDate?:string;
    modifyDate?:string;
}
declare interface IssuanceData {
    bitchId:number;
    issuanceType:'Sandard'|'Directional';
    quantity:number;
    smsNotification:boolean;
    generatingCode:boolean;
    accounts:string[];    
}
declare interface CouponData {
    id:number;
    code:string;
    bitchId:number;    
    denomination:string;
    status:'Receive'|'Use'|'Expire';
    receiveMember?:string;
    useDate?:string;
    receiveDate?:string;    
    createDate?:string;
    modifyDate?:string;
}