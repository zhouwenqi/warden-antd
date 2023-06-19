declare interface RoleData{
    id:number;
    name:string;
    value:string;
    description?:string;
    authoritys:string[];
    createDate:string;
    modifyDate:string;
}