
import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import dayjs from 'dayjs';
import AppChart from '@/components/AppChart';

/** 实时流量监控面版 */
const AgentChartPanel=()=>{
    
    const appChart:MutableRefObject<any> = useRef('agentChart')
    let items:Monitoring.Agent[]=[   
    ]   
    const intervalRef:MutableRefObject<any> = useRef()
    const onReadyHandler=()=>{
        asyncFetch() 
    }
    const asyncFetch = () => {
        fetch('/api/chart/agent')
          .then((response) => response.json())
          .then((json) => {
            items=json
            const interval = setInterval(()=>{
                items.push(getDataRow())
                if(items.length>50){
                    items.splice(0,1)
                }
                reloadData(items)
            },1000)
            intervalRef.current = interval
          })
          .catch((error) => {
            console.log('fetch data failed', error);
          });
    };
    useEffect(() => {    
        
        return ()=>{
            clearInterval(intervalRef.current)
            appChart.current = null
        }
    }, [])

    const getDataRow=():Monitoring.Agent=>{
        var lastPV = 37
        var lastUV = 15
        var lastIP = 9        
        if(items.length>1){   
            const lastAny = items[items.length-1]
            lastPV = lastAny.pv
            lastUV = lastAny.uv
            lastIP = lastAny.ip            
        }
        return {            
            "time":dayjs().format("HH:mm:ss"),
            "pv":getRandomNumber(lastPV),
            "uv":getRandomNumber(lastUV),
            "ip":getRandomNumber(lastIP)
        }
    }

  

    const getRandomNumber=(lastNum:number)=>{
        let lnum = lastNum
        if(isNaN(lnum)){
            lnum = Math.floor(Math.random()*50)
        }
        let num = Math.floor((Math.round(Math.random())*2-1)*Math.floor(Math.random()*5))+lnum
        if(num < 0){
            num = 0
        }
        if(num > 100){
            num = 100
        }
        return num
    }
    
    const initOption = {
        colorBy:'series',
        color:[
            {
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                    {offset:0,color:'#2f60d1'},
                    {offset:0.5,color:'#4480f7'},
                    {offset:1,color:'#ace1ff'}
                ]
            },
            {
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                    {offset:0,color:'#07910a'},
                    {offset:0.5,color:'#20b523'},
                    {offset:1,color:'#bcf346'}
                ]
            },
            {
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                    {offset:0,color:'#9623df'},
                    {offset:0.5,color:'#bc63f5'},
                    {offset:1,color:'#f991f8'}
                ]
            } 
        ],       
        legend: {show:false},
        tooltip: {
            trigger: 'axis',
            borderWidth: 0,
        },
        dataset: {
            dimensions: ["time","pv","uv","ip"],
            source: []
        },
        grid:{
            show:false,
            top:'2px',
            left:'0px',
            right:'0px',
            bottom:'2px'
        },
        xAxis: {type:'category',boundaryGap: false,show:false},
        yAxis: {show:false},
        series: [{ type: 'line',seriesLayoutBy:'row',showSymbol: false}, { type: 'line',seriesLayoutBy:'row',showSymbol: false }, { type: 'line',seriesLayoutBy:'row',showSymbol: false }]
    }
    
    const reloadData=(mdata:Monitoring.Agent[])=>{ 
        const option = {            
            dataset: {
              source: mdata
            }
        }
        appChart.current.setOption(option)        
    }
    
    return(
        <AppChart style={{width:"100%", height:"362px"}} ref={appChart} option={initOption} ready={onReadyHandler} />
    )
}
export default AgentChartPanel