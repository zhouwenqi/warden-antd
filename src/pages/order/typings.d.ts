declare interface OrderData {
    id:number;
    sn:string;
    price:number;
    account:string;
    orderStatus:'Unaudited'|'Audited'|'Cancel'|'Completed'
    paymentStatus:'Notpaid'|'Paid'
    paymentType?:'Weixin'|'Alipay'|'Applepay'|undefined
    createDate?:string;
    modifyDate?:string;
}