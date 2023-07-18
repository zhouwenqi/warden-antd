
import {useState} from 'react';
import { history, Link,useIntl,useModel } from 'umi';
import LoginScreenFrame from './components/LoginScreenFrame';
import LoginNormalFrame from './components/LoginNormalFrame';
import LoginCardFrame from './components/LoginCardFrame';

import SettingDrawer from '@/components/setting/SettingDrawer';
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development';
export default function indexPage(){
    const { initialState } = useModel('@@initialState')
    const [loading,setLoading] = useState(false)
    const intl = useIntl()
    const loginHandler = async () => {  
        setLoading(true)
        try{
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }   
        history.push('/main')
    }

    const forgotHandler=()=>{
        message.warn(intl.formatMessage({id:'login.forgot.password.alt'}))
    }
    const layoutType = initialState?.config?.loginLayout;
    let panel = undefined;
    switch (layoutType) {
        case 'Screen':
        panel = <LoginScreenFrame onLogin={loginHandler} onForegot={forgotHandler} logingStatus={loading} />;
        break;
        case 'Card':
        panel = <LoginCardFrame  onLogin={loginHandler} onForegot={forgotHandler} logingStatus={loading} />;
        break;
        default:
        case 'Normal':
        panel = <LoginNormalFrame onLogin={loginHandler} onForegot={forgotHandler} logingStatus={loading} />;
        break;
    }
    // const settingBtn = isDev ? <SettingDrawer /> : undefined
    const settingBtn = <SettingDrawer />
    return(
        <>
        {settingBtn}
        {panel}
        </>
    )
}