import AppIcon from '@/components/AppIcon';
import { useEffect } from 'react';
import { history } from 'umi';
import styles from './index.less'

/**
 * Page - 首页
 * @returns 
 */
export default function HomePage() {
  useEffect(()=>{    
    const timer = setTimeout(()=>{
      history.push('/login')
    },3000)
    return ()=>clearTimeout(timer)
  },[])

  

  return (
    <div className={styles.startBox}>
      <AppIcon name="logo" size={90} />
    </div>
  );
}
