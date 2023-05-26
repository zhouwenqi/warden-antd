import AppChart from '@/components/AppChart'
import Window from '@/components/window'
import { WindowProps } from "@/components/window/typings"
import { useRef,MutableRefObject, useEffect } from 'react'
import { useIntl } from 'umi'
import styles from './SmsTypeChartWindow.less'

export interface SmsTypeChartWindowProps extends WindowProps {
  data?:SmsData
}
const SmsTypeChartWindow=(props:SmsTypeChartWindowProps)=>{
    const intl = useIntl()    
    const appChart:MutableRefObject<any> = useRef('agentChart')
    const windowProps:WindowProps = {
        width:650,
        title:intl.formatMessage({id:'visit.data.button.chart.analysis'}),        
        onClose:()=>{props.closeWindowHandler!(false)},
        ...props
    }
    let chartTitle = intl.formatMessage({id:'sms.data.chart.terminal.title'}) 
    const chartData = intl.locale == 'en-US' ? ['Verification', 'Promotion', 'Remind'] : ['验证码', '推广营销', '通知提醒']
    const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: chartData
        },
        grid: {
          left: '10px',
          right: '10px',
          bottom: '10px',
          containLabel: true
        },        
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: chartData[0],
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true
          },
          {
            name: chartData[1],
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true
          },
          {
            name: chartData[2],
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
            smooth: true
          }
        ]
    };
    useEffect(()=>{
      if(appChart.current.setOption){
        appChart.current.setOption(option)
      }      
    },[chartData])
    return(
        <Window {...windowProps}>
            <div>
                <div className={styles.title}>                                        
                    <h2>{chartTitle}</h2>            
                    <h6>2023/4/26 - 2023/10/26</h6>        
                </div>                   
                <AppChart style={{ height:"600px"}} ref={appChart} option={option} />
            </div>
        </Window>
    )
}
export default SmsTypeChartWindow