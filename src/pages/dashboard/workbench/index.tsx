
import Container from '@/layouts/components/Container';
import GridPanel from './components/GridPanel';
import styles from './index.less';
import WelcomePanel from './components/WelcomePanel';
import ProjectsPanel from './components/ProjectsPanel';
import LogsPanel from './components/LogsPanel';
/**
 * Page - 工作台
 * @returns 
 */
const WorkbenchPage = () => {
    return (
      <Container showBreadcrumb={false}>
        <WelcomePanel />
        <div className={styles.gridLayout}>
          <div className={styles.gridLeft}>
            <GridPanel />
            <div className={styles.logsBox}>
              <LogsPanel />
            </div>  
          </div>    
          <div className={styles.gridRight}>
            <ProjectsPanel />
          </div>
        </div>
      </Container>
    )
}
  
export default WorkbenchPage;