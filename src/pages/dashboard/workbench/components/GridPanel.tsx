import React, { useState, useEffect } from 'react';
import AppIcon from '@/components/AppIcon';
import { Button, Tag } from 'antd';
import styles from './GridPanel.less';
import AppButton from '@/components/button';
import AppChart from '@/components/AppChart';

/**
 * 基本统计面版 - 工作台
 * @returns 
 */
function GridPanel(){
    const data:GridInfo[] = [
        {id:1,title:'本周新增用户',tag:'相比上周',total:'629',iconName:'member1',iconColor:"#61aa4b",rate:'50%',rateType:'rise'},
        {id:2,title:'今日订单量',tag:'相比昨天',total:'1198',iconName:'order1',iconColor:"#c96079",rate:'10%', rateType:'drop'},
        {id:3,title:'本月成交金额',tag:'相比上月',total:'$10933.34',iconName:'payment1',iconColor:"#289cf5",rate:'32%',rateType:'rise'},
        {id:4,title:'待办事项',tag:'紧急事件',total:'32',iconName:'ring2',iconColor:"#fa583e",rate:'12',rateType:'drop'},
    ]
    

    const option1 = {
        dataset:{
            source:[{'week':'Monday','value':200},{'week':'Tuesday','value':1200},{'week':'Wednesday','value':800},{'week':'Thursday','value':1460},{'week':'Friday','value':560},{'week':'Saturday','value':790},{'week':'Sunday','value':410}],
            dimensions:['week','value']
        },
        tooltip: {
            trigger: 'axis',
            borderWidth: 0,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show:false,
        },
        yAxis: {
          type: 'value',
          show:false
        },
        grid: {
            show:false
        },        
        series: [
          {
            type: 'line',
            smooth: true,
            showSymbol: false,
            color:['#20b523'],
            areaStyle: {
                color:{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[
                        {offset:0,color:'rgba(32,181,35,0.6)'},
                        {offset:0.5,color:'rgba(32,181,35,0.2)'},
                        {offset:0.9,color:'rgba(32,181,35,0)'},
                    ]
                }
            }
          }
        ]
    }

    const option2 = {
        dataset:{
            source:[{'date':'2022-11-01','value':140},{'date':'2022-11-02','value':450},{'date':'2022-11-03','value':1960},{'date':'2022-11-04','value':370},{'date':'2022-11-05','value':1750},{'date':'2022-11-06','value':790}],
            dimensions:['date','value']
        },
        tooltip: {
            trigger: 'axis',
            borderWidth: 0,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show:false,
        },
        yAxis: {
          type: 'value',
          show:false
        },
        grid: {
            show:false
        },        
        series: [
          {
            type: 'line',
            smooth: true,
            showSymbol: false,
            color:['#5d90f6']
          }
        ]
    }

    const option3 = {
        dataset:{
            source:[{'month':'2022-06','value':90},{'month':'2022-07','value':780},{'month':'2022-08','value':490},{'month':'2022-09','value':1270},{'month':'2022-10','value':530},{'month':'2022-11','value':780},{'month':'2022-12','value':419}],
            dimensions:['month','value']
        },
        tooltip: {
            trigger: 'axis',
            borderWidth: 0,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show:false,
        },
        yAxis: {
          type: 'value',
          show:false
        },
        grid: {
            show:false
        },        
        series: [
          {
            type: 'line',
            smooth: true,
            showSymbol: false,
            color:['#5d90f6']
          }
        ]
    }

    return(
        <div className={styles.listBox}>
            <GridCard data={data[0]} memoElement={<div className={styles.gridChartBox}><AppChart style={{width:'100%',height:'100%'}} option={option1} /></div>} moreElement={<AppButton><AppIcon size={12} name='more2' color='#666' /></AppButton>} />
            <GridCard data={data[1]} memoElement={<div className={styles.gridChartBox}><AppChart style={{width:'100%',height:'100%'}} option={option2} /></div>} moreElement={<AppButton><AppIcon size={12} name='more2' color='#666'  /></AppButton>} />
            <GridCard data={data[2]} memoElement={<div className={styles.gridChartBox}><AppChart style={{width:'100%',height:'100%'}} option={option3} /></div>} />
            <GridCard data={data[3]} memoElement={<img className={styles.gridWork} src="/images/visitiors.png" alt="visitiors" />} />
        </div>
        
    )
}

/** 单个统计卡片 */
function GridCard(props:GridCardProps){
    const data = props.data
    return(
        <div className={styles.boxItem}>
            <div className={styles.gridBox}>                    
                <div className={styles.gridTitle}>
                    <div className={styles.titleLeft}>
                        {data.iconName?<AppIcon name={data.iconName} size={16} color="#333333" />:<></>}
                        <label>{data.title}</label>
                        {data.sub?<Tag>{data.sub}</Tag>:<></>}
                    </div>
                    {props.moreElement}
                </div>
                <div style={{margin:'20px 0px'}}>
                    <label className={styles.number}>{data.total}</label>
                </div>                
                <div className={styles.gridFooter}>
                    <label className={data.rateType == 'rise' ? styles.green : styles.red}>{data.rateType == 'rise' ? <AppIcon name="rise" size={12} color="#40be08" /> : <AppIcon name="drop" size={12} color="#ff0000" />}{data.rate}</label>
                    <span>{data.tag}</span>  
                </div>
                {props.memoElement}                               
            </div>
        </div>
    )
}

export default GridPanel
export {GridCard}