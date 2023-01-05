import Panel, { WardenPanel } from "@/components/panel";
import Container from "@/layouts/components/Container"
import { Button } from "antd";
import AgentChartPanel from "./components/AgentChartPanel";
import SalesChartPanel from "./components/SalesChartPanel";
import TransformPanel from "./components/TransformPanel";
import styles from './index.less';

const MonitoringPage = () => {
    return (
      <Container boxStyle="box" showTitle={true}>
        <div className={styles.box}>
          <div className={styles.boxLeft}>
            <WardenPanel title="区域销售数据">
              <SalesChartPanel />
            </WardenPanel>
          </div>
          <div className={styles.boxRight}>
            <WardenPanel title="实时流量监控">
              <AgentChartPanel />
            </WardenPanel>
          </div>
        </div>  
        <div className={styles.box}>
          <div className={styles.boxLeft}>
              <WardenPanel title="转化率">
                <TransformPanel />
              </WardenPanel>
          </div>
          <div className={styles.boxRight}>
            <WardenPanel title="实时流量监控">
              <label>4444</label>
            </WardenPanel>
          </div>
        </div>     
      </Container>
    )

}  


export default MonitoringPage;