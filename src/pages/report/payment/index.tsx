import Container from '@/layouts/components/Container'
import { message } from 'antd'
import { useState } from 'react';
import { useIntl } from 'umi';
import ApplicationPaymentChartPanel from './components/ApplicationPaymentChartPanel';
import PaymentTotalPanel from './components/PaymentTotalPanel';
import TerminalPaymentChartPanel from './components/TerminalPaymentChartPanel';
import styles from './index.less'

/**
 * Page - 订单支付
 * @returns 
 */
const PaymentPage =()=>{  
    const intl = useIntl()
    const [messageApi, contextHolder] = message.useMessage();
    const getRandomNumber=(s:number,t:number):number=>{
        return Math.floor(Math.random()*(t-s))+t
    }
    const getRandomData=():IPaymentInfo=>{
        return {
            paymentTotal:getRandomNumber(20,40)*100000 + getRandomNumber(100000,999999),
            paid:getRandomNumber(20,40)*100000 + getRandomNumber(10000,99999),
            notPaid:getRandomNumber(10000,50000),
            orderTotal:getRandomNumber(10000,20000),
            cancelOrders:getRandomNumber(500,1500),
            refund:getRandomNumber(200,400),
            waitOrders:getRandomNumber(100,200),
            appData:[[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)]],
            deviceData:[
                {value:getRandomNumber(1200,2900),name:'PC'},
                {value:getRandomNumber(1400,2600),name:'MAC'},
                {value:getRandomNumber(1200,3400),name:'MOBILE'},
                {value:getRandomNumber(1000,2800),name:'SERVER'},
                {value:getRandomNumber(1600,2800),name:'OTHER'}
            ]
        }
    }
    const [data,setData]=useState<IPaymentInfo>(getRandomData())  
    const msgKey='updateData'
    const paymentTotalProps:PaymentTotalProps = {
        data,
        onChange:()=>{
            messageApi.open({
                key:msgKey,
                type: 'loading',
                content: intl.formatMessage({id:'global.message.loading'}) + '...',
            });
            setTimeout(()=>{
                messageApi.open({
                    key:msgKey,
                    type: 'success',
                    content:  intl.formatMessage({id:'global.message.loaded'}) + '!',
                    duration: 1,
                });
                setData(getRandomData())
            },1000)            
        }
    }
    
    return(
        <Container boxStyle="box" showTitle={true}>
            {contextHolder}
            <PaymentTotalPanel {...paymentTotalProps} />
            <div className={styles.chartBox}>
                <div className={styles.boxLeft}>
                    <div className={styles.chartTitle}>
                        <h1>{intl.formatMessage({id:'payment.chart.platform.title'})}</h1>                        
                    </div>
                    <ApplicationPaymentChartPanel data={data} />
                </div>
                <div className={styles.boxRight}>
                    <div className={styles.chartTitle}>
                        <h1>{intl.formatMessage({id:'payment.chart.terminal.title'})}</h1>                        
                    </div>                    
                    <TerminalPaymentChartPanel data={data} />
                </div>
            </div>
        </Container>
    )
}

export default PaymentPage