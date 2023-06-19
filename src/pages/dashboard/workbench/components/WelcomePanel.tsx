import { Avatar, Tag } from "antd"
import { Link, useIntl, useModel } from "umi"
import dayjs from 'dayjs';
import styles from './WelcomePanel.less'

/**
 * Panel - 欢迎面版
 * @returns 
 */
const WelcomePanel=()=>{    
    const intl = useIntl()
    const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
    
    const hour = dayjs().hour()    
    var weltag = ''
    if(hour > 6 && hour < 11){
      weltag = intl.formatMessage({id:'workbench.welcome.time.morning'})
    }
    else if(hour > 11 && hour < 14){
      weltag = intl.formatMessage({id:'workbench.welcome.time.goodnoon'})  
    }else if(hour > 14 && hour < 18){
      weltag = intl.formatMessage({id:'workbench.welcome.time.afternoon'})
    }else{
      weltag = intl.formatMessage({id:'workbench.welcome.time.evening'})
    }
    
    return(
      <div className={styles.welcomeBox}>          
        <div className={styles.welcomeMemberBox}>
          <Link to="/member">
            <Avatar size={64} src={global.currentUser.face}>{global.currentUser.uid}</Avatar>
          </Link>        
          <div className={styles.welcomeInfo}>
            <label>{weltag}，<Link to="/system/profile">{global.currentUser.nickName}</Link>，{intl.formatMessage({id:'workbench.welcome.title'})}</label><br />
            <span className={styles.deptInfo}>{initialState?.currentUser?.deptName} - {initialState?.currentUser?.postName} - </span><Tag>{initialState?.currentUser?.roleName}</Tag>
          </div>
        </div>
        <div className={styles.descInfo}>        
          <div className={styles.descItem}>
            <span>{intl.formatMessage({id:'workbench.welcome.account.id'})}</span><br />
            <label>{global.currentUser.id}</label>
          </div>
          <div className={styles.descItem}>
            <span>{intl.formatMessage({id:'workbench.welcome.account.mobile'})}</span><br />
            <label>{global.currentUser.mobile}</label>
          </div>
          <div className={styles.descItem}>
            <span>{intl.formatMessage({id:'workbench.welcome.account.signin.total'})}</span><br />
            <label>{global.currentUser.loginTotal}</label>
          </div>        
        </div>      
      </div>
    )
}

export default WelcomePanel