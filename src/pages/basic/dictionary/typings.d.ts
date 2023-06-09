declare interface DictionaryData{
    id:number;
    name:string;
    key:string;
    value:string;
    type:'String'|'Number'|'Boolean'|'Object'|'Array'
    description?:string;
    createDate:string;
    modifyDate:string;
}