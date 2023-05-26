declare interface GridCardProps{
    data:GridInfo;
    memoElement?:JSX.Element;
    moreElement?:JSX.Element;
}

declare interface GridInfo{
    id?:number;
    title:string;
    sub?:string;
    tag:string;
    total:string,
    iconName?:string;
    iconColor?:string;
    rateType:'rise'|'drop'|'flag';
    rate:string;
}

declare namespace Warkbench{
    interface Project {
        id:number;
        code?:string;
        name:string;
        icon?:string;
        color?:string;
        memberCount:number;
        speedCount:number;
        testCount:number;
        description?:string;
        createDate?:string;
        modifyDate?:string;
    }
}
