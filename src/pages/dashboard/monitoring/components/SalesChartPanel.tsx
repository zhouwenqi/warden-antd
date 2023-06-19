import AppChart from '@/components/AppChart';
import { Statistic } from 'antd';
import { useEffect,useRef,MutableRefObject,useState } from 'react';
import { RiseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './SalesChartPanel.less';
import { useIntl } from 'umi';

const { Countdown } = Statistic;

/**
 * 区域销售数据监控
 * @returns 
 */
const SalesChartPanel=()=>{
    const appChart:MutableRefObject<any> = useRef()
    const intl = useIntl()
    let colors:{[key:string]:string} = {
      BeiJing:'#77abe5',
      ShangHai:'#66bf6e',
      HongKong:'#b489c6',
      GuangDong:'#84bbc3',
      FuJian:'#e0686d',
      JiangShu:'#e9ab73',
      ZheJiang:'#abe5c7',
      TianJing:'#eda3b9',
      TaiWan:'#b19c85',
      HaiNan:'#9fd5e9',
    }

    colors = {
      BeiJing:'#3ba272',
      ShangHai:'#b19c85',
      HongKong:'#fac858',
      GuangDong:'#5470c6',
      FuJian:'#73c0de',
      JiangShu:'#fc8452',
      ZheJiang:'#d88ec4',
      TianJing:'#ee6666',
      TaiWan:'#91cc75',
      HaiNan:'#9a60b4',
    }
      
    const initOption = {
      dataset: {
        source: [
        ]
      },
      tooltip: {
        trigger: 'axis',
        borderWidth: 0,
      },
      grid:{
        top:'20px',
        left:intl.locale=='en-US'? '100px' : '40px',
        right:'20px',
        bottom:'20px'
      },
      xAxis: {
        max: 'dataMax'
      },
      yAxis: { 
        type: 'category',
        inverse: true,
        realtimeSort: true,
        seriesLayoutBy: 'column',
        animationDuration: 300,
        animationDurationUpdate: 300,        
      },
      series: [
        {
          type: 'bar',
          encode: {
            x: 'value',
            y: 'name',
          },
          itemStyle:{
            color:(param:any)=>{
              return colors[param.value.area]
            },
            borderRadius:[0,8,8,0]            
          },
          barGap:'20%',
          barWidth:16,
          realtimeSort: true,
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        }
      ]
    }
   

    const onReadyHandler=()=>{
      
    }

    const onChangeHandler=(option:any,total:number,overly:boolean)=>{      
      if(!overly && appChart.current){
        const ops = {grid:{left:intl.locale=='en-US'? '80px' : '40px'},...option}
        appChart.current.setOption(ops)
      }      
    }

    const endTime = Date.now() + 60 * 5 * 1000
    return(
      <>
      <div className={styles.statisticBox}>
        <Statistic title={intl.formatMessage({id:'monitoring.sales.active.begin'})} valueStyle={{color:"#666666"}} value={dayjs().format("YYYY-MM-DD HH:mm:ss")} />
        <SalesCount onChange={onChangeHandler} endTime={endTime} />
        <Countdown title={intl.formatMessage({id:'monitoring.sales.active.remaining'})} value={endTime} format="HH:mm:ss:SSS" />
      </div>
      <AppChart style={{width:"100%", height:"300px"}} ref={appChart} option={initOption} ready={onReadyHandler} />
      </>
    )
}

const SalesCount=(props:Monitoring.TotalProps)=>{
  const intl = useIntl()
  const locale = intl.locale
  const [total,setTotal] = useState(0)
  const intervalRef:MutableRefObject<any> = useRef()  
  let chartData:Monitoring.Sales[]=[]
  
  useEffect(()=>{
    asyncFetch()  
    return ()=>{
      onClearInterval()
    }
  },[locale])
  const onClearInterval=()=>{
    clearInterval(intervalRef.current)
  } 
  const asyncFetch = () => {
    fetch('/api/monitoring/sales',{
        method:'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          locale
        }
      })
      .then((response) => response.json())
      .then((json) => {
        chartData = json
        const interval = setInterval(()=>{
          var total = 0
          var overly = false
          if(Date.now() >= props.endTime){
            onClearInterval()
            overly = true
            return
          }
          for(var i=0;i<10;i++){
            if(Math.random() > 0.9){
              chartData[i].value += Math.round(Math.random() * 10)
            }else{
              chartData[i].value += Math.round(Math.random() * 1)
            }
            total += chartData[i].value
          }
          const option = {
            dataset: {
              source: chartData
            }
          }
          setTotal(total)
          props.onChange(option,total,overly)
          
        },300)
        intervalRef.current = interval
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      })
  }

  return(
    <Statistic title={intl.formatMessage({id:'monitoring.sales.active.total'})} value={total+' K'} suffix={<RiseOutlined />} />
  )
}

export default SalesChartPanel