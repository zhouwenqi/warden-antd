import Window from "@/components/window"
import { useState,useRef,MutableRefObject, useEffect } from "react"
import { useIntl } from "umi"
import { WindowProps } from "@/components/window/typings"
import AppChart from "@/components/AppChart"
import styles from './VistsChartWindow.less'
import { Segmented } from "antd"
import { SegmentedValue } from "antd/lib/segmented"

/**
 * 终端占比统计图表面版
 * @param props 
 * @returns 
 */
const VistsChartWindow=(props:VisitChartWindowProps)=>{
    const intl = useIntl()
    const [charType,setChartType]=useState<VistChartType>('Terminal')    
    const appChart:MutableRefObject<any> = useRef('agentChart')

    const windowProps:WindowProps = {
        open:props.open,
        width:600,
        title:intl.formatMessage({id:'visit.data.button.chart.analysis'}),        
        onClose:()=>{props.closeWindowHandler(false)}
    }



    let data = [
        {value:32812,name:'MAC'},
        {value:20123,name:'PC'},
        {value:15323,name:'SERVER'},
        {value:27231,name:'MOBILE'},
        {value:18453,name:'OTHER'}
    ]

    let chartTitle = intl.formatMessage({id:'visit.data.chart.terminal.title'}) 
    if(charType == 'Application'){
        data = [            
            {value:12304,name:'ANDROID'},
            {value:21310,name:'IOS'},
            {value:17850,name:'WEIXIN'},
            {value:32310,name:'WEB'},
            {value:16537,name:'OTHER'}
        ]
        chartTitle = intl.formatMessage({id:'visit.data.chart.application.title'})
    }  

    const option = {
        legend: {
          top: 'bottom'
        },
        grid:{
            show:false,
            top:'10px',
            left:'10px',
            right:'10px',
            bottom:'10px'
        },
        tooltip: {
            trigger: 'item',
            borderWidth: 0,
        },
        series: [
          {
            type: 'pie',            
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: data
          }
        ]
    }
    
    useEffect(()=>{
        if(appChart.current.setOption){
            appChart.current.setOption(option)
        }

    },[charType])

    const segmentedOptions = [
        {label:intl.formatMessage({id:'visit.data.property.terminal'}),value:'Terminal'},
        {label:intl.formatMessage({id:'visit.data.property.application'}),value:'Application'}
    ]

    const onChangeChartTypeHandler=(e:SegmentedValue)=>{
        setChartType(e as VistChartType)        
    }
    
    return(
        <Window {...windowProps }>
            <div>
                <div className={styles.title}>                                        
                    <h2>{chartTitle}</h2>            
                    <h6>2023/4/26 - 2023/10/26</h6>        
                </div>
                <div className={styles.tab}>
                    <Segmented onChange={onChangeChartTypeHandler} defaultValue={'Terminal'} options={segmentedOptions} />
                </div>                
                <AppChart style={{ height:"600px"}} ref={appChart} option={option} />
            </div>
        </Window>
    )
}
export default VistsChartWindow