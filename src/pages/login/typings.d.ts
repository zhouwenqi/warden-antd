declare type FrameProps = {
    onLogin:(values:any)=>void;
    onForegot?:()=>void;
    logingStatus:boolean;
}