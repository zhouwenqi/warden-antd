import Panel, { WardenPanel } from "@/components/panel";
import Container from "@/layouts/components/Container"
import { Button } from "antd";
import { useIntl } from "umi";
import AgentChartPanel from "./components/AgentChartPanel";
import OrderChartPanel from "./components/OrderChartPanel";
import SalesChartPanel from "./components/SalesChartPanel";
import TransformPanel from "./components/TransformPanel";
import styles from './index.less';
/**
 * Page - 监控页
 * @returns 
 */
const MonitoringPage = () => {
  const intl = useIntl()
  return (
    <Container boxStyle="box" showTitle={true}>
      <div className={styles.box}>
        <div className={styles.boxLeft}>
          <WardenPanel title={intl.formatMessage({id:'monitoring.sales.title'})}>
            <SalesChartPanel />
          </WardenPanel>
        </div>
        <div className={styles.boxRight}>
          <WardenPanel title={intl.formatMessage({id:'monitoring.visits.title'})}>
            <AgentChartPanel />
          </WardenPanel>
        </div>
      </div>  
      <div className={styles.box}>
        <div className={styles.boxLeft}>
            <WardenPanel title={intl.formatMessage({id:'monitoring.transformed.title'})}>
              <TransformPanel />
            </WardenPanel>
        </div>
        <div className={styles.boxRight}>
          <WardenPanel title={intl.formatMessage({id:'monitoring.projects.title'})}>
            <OrderChartPanel />
          </WardenPanel>
        </div>
      </div>     
    </Container>
  )

}  


export default MonitoringPage;