import { Link } from 'umi';
import styles from './index.less'
const WorkbenchPage = () => {
    return (
      <div className={styles.box}>
        <label>WorkbenchPage.</label>
        <Link to='/main/control/dashboard/www'>www</Link>
      </div>
    )
}
  
export default WorkbenchPage;