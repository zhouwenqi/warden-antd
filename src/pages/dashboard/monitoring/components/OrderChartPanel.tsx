import AppChart from '@/components/AppChart';
import { useEffect,useRef,MutableRefObject,useState } from 'react';
import styles from './OrderChartPanel.less';

/**
 * 订单实时监控面版
 * @returns 
 */
const OrderChartPanel=()=>{
    const appChart:MutableRefObject<any> = useRef()
    const projectsData = ['xxx','yyy','mmm','zzz','bbb'] 

    const getRandomRow=(tag:string,time:string)=>{
        var n1 = Math.floor(Math.random()*(50-960)) + 960   
        var n2 = Math.floor(Math.random()*(110-220)) + 220
        var n3 = Math.floor(Math.random()*9 + 1)*Math.floor(Math.random()*(10000-19999)+19999)
        return [n1,n2,n3,tag,time]
    }

    let datas = []
    let months = []
    for(var i=1;i<=12;i++)  {
        const time = '2023-' + i
        months.push(time)
        datas.push([getRandomRow('xxx',time),getRandomRow('yyy',time),getRandomRow('mmm',time),getRandomRow('zzz',time),getRandomRow('bbb',time)])
    }
    

    useEffect(()=>{       
                 
    },[])

    const onReadyHandler=()=>{
        
    }

    const sizeChange=(x:number)=>{       
        let y=Math.sqrt(x / 1000000) + 0.1
        return Math.floor(y*120)
    }

    var initOption = {
        baseOption:{
            timeline:{             
                autoPlay: true,
                inverse: true,
                playInterval: 3000,                
                show:false,       
                data:[] as string[]
            },
            title:[
                {
                    text:months[0],
                    textAlign:'center',
                    left:'63%',
                    top:'60%',
                    textStyle:{
                        fontSize:30
                    }
                }
            ],
            legend: {show:false},
            tooltip: {
                trigger: 'axis',
                borderWidth: 0,
                padding:10,
                formatter: function (obj:any) {
                    var value = obj[0].value;
                    console.log(value)
                    return '销售额' + '：' + value[2] + '<br>'
                                  + '订单量' + '：' + value[0] + '<br>'
                                  + '访问量' + '：' + value[1] + '<br>'
                  }
            },
            
            grid:{
                top:'30px',
                containLabel:true,
                left:'2px',
                right:'60px',
                bottom:'2px'
            },
            xAxis: {
                type:'log',
                max:1000,
                min:50,            
                name:'访问量',
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type:'value',
                name:'订单量',
                max:250,
                splitLine: {
                    show: false
                },
            },
            boundaryGap:true,
            visualMap:[
                {
                    show:false,
                    dimension:3,
                    categories:projectsData,
                    inRange:{
                        color:(()=>{
                            var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
                            return colors.concat(colors)
                        })()
                    }
                }
            ],
            series: [
                { 
                    type: 'scatter',
                    itemStyle:{
                        opacity:0.8
                    },
                    data:datas[0],
                    symbolSize:function(val:any){
                        return sizeChange(val[2])
                    }

                }
            ], 
            animationDurationUpdate: 2000,
            animationEasingUpdate: 'quinticInOut'           
        },
        options:[] as any[]        
    }
   
    for(var i=0;i<months.length;i++){
        initOption.baseOption.timeline.data.push(months[i])
        initOption.options.push({
            title:{
                show:true,
                text:months[i]
            },
            series:
            { 
                name:months[i],
                data:datas[i],
            }
            
        })
    }

    return(
        <div>
            <AppChart style={{width:"100%", height:"200px"}} ref={appChart} option={initOption} ready={onReadyHandler} />
        </div>
    )
}

export default OrderChartPanel;