import AppChart from '@/components/AppChart';
import styles from './TransformPanel.less';
import {MutableRefObject,useRef,useEffect} from 'react'


/**
 * 转换率面版
 * @returns 
 */
const TransformPanel = ()=>{

    const intervalRef:MutableRefObject<any> = useRef()
    const appChart1:MutableRefObject<any> = useRef()
    const appChart2:MutableRefObject<any> = useRef()
    const appChart3:MutableRefObject<any> = useRef()
    const appChart4:MutableRefObject<any> = useRef()

    let chartData:any[]=[{name:'成交率',value:70},{name:'下载率',value:30},{name:'留存率',value:50},{name:'回访率',value:80}]
    useEffect(()=>{
        loadData()
        return ()=>{
            onClearInterval()
        }
    },[]) 
    
    const loadData=()=>{        
        const interval = setInterval(()=>{
            
            for(var i=0;i<4;i++){
                const value = Math.round(Math.random() * 30) + 70
                chartData[i].value = value               
            }

            const option1 = {
                series: {
                   
                    data: [chartData[0]]
                }
            }   
            const option2 = {                 
                series: {
                    
                    data: [chartData[1]]
                }
            }  
            const option3 = {                 
                series: {                    
                    data: [chartData[2]]
                }
            }  
            const option4 = {                 
                series: {
                   
                    data: [chartData[3]]
                }
            } 
            appChart1.current.setOption(option1)     
            appChart2.current.setOption(option2)     
            appChart3.current.setOption(option3)     
            appChart4.current.setOption(option4)     
          },300)
          intervalRef.current = interval
    }

    const onClearInterval=()=>{
        clearInterval(intervalRef.current)
        intervalRef.current = null        
    } 

    const initOption = {
        tooltip: {
            formatter: '{a} {b} : {c}%',            
            borderWidth: 0,
        },
        grid:{
            top:'0px',
            left:'0px',
            right:'0px',
            bottom:'0px'
        },
        title:{},
        series: [
        {
            type: 'gauge',           
            progress: {
                show: true,
                width: 6
            },
            axisLine: {
                lineStyle: {
                  width: 6
                }
            },
            title: {
                offsetCenter: [0, '30%'],
                fontSize: 14,
                color:'#999999'
            },
            axisTick: {
                show: true,
                distance:0,
                length: 4,
                lineStyle:{
                    width:1,
                    color:'#aaaaaa'
                }
                
            },  
            splitLine:{
                length: 8,
                distance:0,
                lineStyle:{
                    width:1
                }
            },   
            axisLabel:{
                show:false
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}%',
                fontSize: 24,
                offsetCenter: [0, '70%']
            },
            data: [
                {
                    value: 0,
                }
            ]
        }
        ]
    }
    return(
        <div className={styles.box}>
            <AppChart ref={appChart1} option={initOption} style={{width:'25%',height:'200px'}} />
            <AppChart ref={appChart2} option={initOption} style={{width:'25%',height:'200px'}} />
            <AppChart ref={appChart3} option={initOption} style={{width:'25%',height:'200px'}} />
            <AppChart ref={appChart4} option={initOption} style={{width:'25%',height:'200px'}} />
        </div>
    )
}
export default TransformPanel