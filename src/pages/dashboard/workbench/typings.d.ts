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
    rateType:'rise'|'drop';
    rate:string;
}

declare namespace Warkbench{
    interface Project {
        id:string;
        name:string;
        icon:string;
        memberCount:number;
        speedCount:number;
        testCount:number;
        description?:string;
        createDate?:string;
    }
}
