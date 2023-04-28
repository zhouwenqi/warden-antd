import AppChart from "@/components/AppChart";
import { useEffect, useRef,MutableRefObject } from "react";

/**
 * 销售额终端占比统计图表面版
 * @param props 
 * @returns 
 */
const TerminalPaymentChartPanel=(props:{data:IPaymentInfo})=>{
    const appChart:MutableRefObject<any> = useRef('agentChart')
    type EChartsOption = echarts.EChartsOption;
    var option: EChartsOption;
    const {data} = props;    
    
    option = {
        tooltip: {
          trigger: 'item',
          borderWidth: 0,
          formatter: (obj:any)=> {
            return ''+obj.percent+'%'
          }
        },
        legend: {
            orient: 'vertical',
            left: '20px'
        },
        grid:{
            top:'0px',
            left:'0px',
            right:'0px',
            bottom:'0px'
        }, 
        series: [
          {
            name: 'Device',
            type: 'pie',
            radius: [50, 160],
            avoidLabelOverlap: false,
            roseType: 'area',      
            itemStyle: {
                borderRadius: 5
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data.deviceData
          }
        ]
    }
    useEffect(()=>{
        appChart.current.setOption(option)
    },[props.data])
    return(
        <AppChart style={{height:"460px"}} ref={appChart} option={option} />
    )
}

export default TerminalPaymentChartPanel