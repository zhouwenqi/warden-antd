import * as echarts from 'echarts';
import { useEffect,useImperativeHandle,useRef,forwardRef,Ref, MutableRefObject } from 'react';

const AppChart=(props:AppChartProps,ref:Ref<any>)=>{
    const echartsRef:MutableRefObject<any> = useRef()
    
    let myChart:any
    useEffect(()=>{
        const dom = echartsRef.current as unknown as HTMLElement
        myChart = echarts.init(dom)
        myChart.on('finished',()=>{
            if(props.finished){
                props.finished()
            }
        })
       
        if(props.ready){
            props.ready()
        }
        if(props.option){
            myChart.setOption(props.option)
        }        
        window.addEventListener('resize',handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }        
    },[])
    
    useImperativeHandle(ref,()=>({
        setOption:(option:any)=>{
            if(myChart==null){
                const dom = echartsRef.current as unknown as HTMLElement
                myChart = echarts.init(dom)
            }
            myChart.setOption(option)
        }})
    )
    const handleResize=()=>{
        try{
            myChart.resize()
        }
        catch(err){}
    }

    return(
        <div ref={echartsRef} style={props.style}></div>
    )

}
export default forwardRef(AppChart)