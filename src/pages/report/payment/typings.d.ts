declare interface IPaymentInfo{
    paymentTotal:number;
    paid:number;
    notPaid:number;
    refund:number;
    orderTotal:number;
    cancelOrders:number;
    waitOrders:number;
    appData:number[][];
    deviceData:any[];
}
declare interface PaymentTotalProps{
    data:IPaymentInfo
    onChange:()=>void
}