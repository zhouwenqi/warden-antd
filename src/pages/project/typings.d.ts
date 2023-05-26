declare interface ProjectData{
    id:number;
    name:string;
    code?:string;
    color?:string;
    description?:string;
    icon?:string;
    memberCount:number;
    type?:string;
    createDate?:string;
    modifyDate?:string;
}

declare interface ProjectPanelProps{
    data:ProjectData[];
    onCreate?:()=>void;
    onViewDetails?:(data:ProjectData)=>void;
}

