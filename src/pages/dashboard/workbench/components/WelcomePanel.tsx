import { Avatar, Tag } from "antd"
import { Link, useIntl } from "umi"
import dayjs from 'dayjs';
import styles from './WelcomePanel.less'

/**
 * Panel - 欢迎面版
 * @returns 
 */
const WelcomePanel=()=>{    
    const intl = useIntl()
    const hour = dayjs().hour()
    console.log(hour)
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
            <span className={styles.deptInfo}>{global.currentUser.deptName} - {global.currentUser.postName}</span><Tag color="orange">{global.currentUser.roleName}</Tag>
          </div>
        </div>
        <div className={styles.descInfo}>        
          <div className={styles.descItem}>
            <span>{intl.formatMessage({id:'workbench.welcome.account.id'})}</span><br />
            <label>827397238</label>
          </div>
          <div className={styles.descItem}>
            <span>{intl.formatMessage({id:'workbench.welcome.account.mobile'})}</span><br />
            <label>139***322</label>
          </div>
          <div className={styles.descItem}>
            <span>{intl.formatMessage({id:'workbench.welcome.account.signin.total'})}</span><br />
            <label>3089</label>
          </div>        
        </div>      
      </div>
    )
}

export default WelcomePanel