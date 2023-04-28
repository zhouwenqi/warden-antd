import AppChart from "@/components/AppChart";
import { useRef,MutableRefObject, useEffect } from "react";

/**
 * 销售额应用分组统计图表面版
 * @param props 
 * @returns 
 */
const ApplicationPaymentChartPanel=(props:{data:IPaymentInfo})=>{   
    const appChart:MutableRefObject<any> = useRef('agentChart')
    type EChartsOption = echarts.EChartsOption;    
    var option: EChartsOption;
    const {data} = props;
    option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['ANDROID', 'IOS', 'WEIXIN', 'WEB', 'OTHER']
        },
        grid:{
            top:'50px',
            left:'50px',
            right:'30px',
            bottom:'40px'
        },      
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['2019', '2020', '2021', '2022', '2023'],
            axisLine:{show:false}
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'ANDROID',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
                borderRadius: 5
            },
            data: data.appData[0]
          },
          {
            name: 'IOS',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
                borderRadius: 5
            },
            data: data.appData[1]
          },
          {
            name: 'WEIXIN',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
                borderRadius: 5
            },
            data: data.appData[2]
          },
          {
            name: 'WEB',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
                borderRadius: 5
            },
            data: data.appData[3]
          },
          {
            name: 'OTHER',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
                borderRadius: 5
            },
            data: data.appData[4]
          }
        ]
    }
    useEffect(()=>{
        appChart.current.setOption(option)
    },[props.data])
    return <AppChart style={{height:"460px"}} ref={appChart} option={option} />
}

export default ApplicationPaymentChartPanel