declare interface AdData{
    id:number;
    slotsId:number;
    slotsCode:string;
    slotsType:SoltsType;
    title:string;
    content:string;
    order:number;
    link?:string;
    clickSum:number;
    expire:string;
    createDate?:string;
    modifyDate?:string;
}