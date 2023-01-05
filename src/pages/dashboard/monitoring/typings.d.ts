declare namespace Monitoring{
    interface Agent{
        pv:number,
        uv:number,
        ip:number,
        time:string
    }
    interface Sales{
        name:string,
        value:number,
        time:string,
        color?:string
    }
    interface TotalProps{
        onChange:Function,
        endTime:number
    }
}