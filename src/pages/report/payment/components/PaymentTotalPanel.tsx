import { useIntl } from "umi"
import { DatePicker, Space } from 'antd';
import styles from './PaymentTotalPanel.less'

const { RangePicker } = DatePicker;

/**
 * 销售额统计栏
 * @param props 
 * @returns 
 */
const PaymentTotalPanel=(props:PaymentTotalProps)=>{
    const intl = useIntl()
    const {data} = props   
     
    return(
        <div className={styles.totalPanel}>
            <div className={styles.totalBox}>
                <div className={styles.totalItem}>
                    <label>{intl.formatMessage({id:'payment.sales.amount.total'})}</label>
                    <h1>{'$'+data.paymentTotal}</h1>
                </div>
                <div className={styles.totalItem} style={{border:"0px",paddingRight:"0px"}}>
                    <label>{intl.formatMessage({id:'payment.paid.amount.total'})}</label>
                    <h3>{'$'+data.paid}</h3>
                    <label style={{marginTop:"4px"}}>{intl.formatMessage({id:'payment.notpaid.amount.total'})}</label>
                    <h3>{'$'+data.notPaid}</h3>
                </div>
                <div className={styles.totalItem}>
                    <label>{intl.formatMessage({id:'payment.refund.amount.total'})}</label>
                    <h3>{'$'+data.refund}</h3>
                </div>
                <div className={styles.totalItem} style={{border:"0px",paddingRight:"0px"}}>
                    <label>{intl.formatMessage({id:'payment.order.total'})}</label>
                    <h3>{data.orderTotal}</h3>
                    <label style={{marginTop:"4px"}}>{intl.formatMessage({id:'payment.order.notaudited'})}</label>
                    <h3>{data.waitOrders}</h3>                        
                </div>
                <div className={styles.totalItem}>
                    <label>{intl.formatMessage({id:'payment.order.invalid'})}</label>
                    <h3>{data.cancelOrders}</h3>
                </div>
                <div className={styles.totalFilter}>
                    <div className={styles.filterBox}>                            
                        <RangePicker
                            format="YYYY-MM-DD"
                            placement="bottomRight"                              
                            onChange={()=>{props.onChange()}}                            
                            />
                    </div>                        
                </div>
            </div>
        </div>
    )
}

export default PaymentTotalPanel