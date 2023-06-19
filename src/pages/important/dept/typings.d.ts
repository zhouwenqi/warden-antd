declare interface DeptData{
    id:number;
    name:string;
    code:string;
    deptId?:number;
    description?:string;
    depts:DeptData[];
    createDate?:string;
    modifyDate?:string;
}