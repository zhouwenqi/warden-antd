import styles from './LoginScreenFrame.less';
import AppIcon from '@/components/AppIcon';
import { Alert, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useIntl, Link } from 'umi';
import AppSwiper from '@/components/AppSwpier';

/**
 * 登录页 - 场景分隔布局
 * @returns
 */
export default function LoginScreenFrame(props:FrameProps) {
  const intl = useIntl();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const data = {
      uid:values.uid,
      pwd:values.password
    }
    props.onLogin(data)
  }

  const vaildParams = (sender: any, value: { value: string }) => {
    console.log('value:' + value);
    if (value) {
      return Promise.resolve();
    }
    const vaildMessage =
      sender.field == 'uid'
        ? intl.formatMessage({ id: 'login.check.uid.empty' })
        : intl.formatMessage({ id: 'login.check.pwd.empty' });
    return Promise.reject(new Error(vaildMessage));
  }
  
  const swiperData:AppSwiperProps = {
    data:[
      {id:1,source:(<div className={styles.swiperItem}><img  src="/images/screen1.png" /><h1>{intl.formatMessage({ id: 'login.layout.screen.card.title1' })}</h1><h3>{intl.formatMessage({ id: 'login.layout.screen.card.describe1' })}</h3></div>)},
      {id:2,source:(<div className={styles.swiperItem}><img src="/images/screen2.png" /><h1>{intl.formatMessage({ id: 'login.layout.screen.card.title2' })}</h1><h3>{intl.formatMessage({ id: 'login.layout.screen.card.describe2' })}</h3></div>)},
      {id:3,source:(<div className={styles.swiperItem}><img src="/images/screen3.png" /><h1>{intl.formatMessage({ id: 'login.layout.screen.card.title3' })}</h1><h3>{intl.formatMessage({ id: 'login.layout.screen.card.describe3' })}</h3></div>)}
    ],
    width:'500px',
    height:'700px'
  }

  return (
    <div className={styles.frameBody}>
      <div className={styles.frameLeft}>
        <div className={styles.bannerBox}>          
          <AppSwiper {...swiperData} />
        </div>
      </div>
      <div className={styles.frameRight}>
        <div></div>
        <div className={styles.loginFrameBox}>
          <div className={styles.fromTop}>
            <AppIcon name="logo" className={styles.svgLogo} />
            <h2>{intl.formatMessage({ id: 'app.title' })}</h2>
            <h3>{intl.formatMessage({ id: 'login.welcome.title' })}</h3>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item name="uid" rules={[{ validator: vaildParams }]}>
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'login.input.uid' })}
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ validator: vaildParams }]}>
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder={intl.formatMessage({ id: 'login.input.pwd' })}
              />
            </Form.Item>
            <div className={styles.loginSplitItem}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox defaultChecked>
                  {intl.formatMessage({ id: 'login.rememberme' })}
                </Checkbox>
              </Form.Item>
              <a onClick={()=>{props.onForegot!()}}>
                {intl.formatMessage({ id: 'login.forgot.pwd' })}
              </a>
            </div>
            <Form.Item name="loginbtn" style={{ marginBottom: '0px' }}>
              <Button loading={props.logingStatus} type="primary" htmlType="submit" block>
                {intl.formatMessage({ id: 'login.button.submit' })}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.copyrightBox}>
          {intl.formatMessage({ id: 'app.copyright.info' })}
        </div>
      </div>
    </div>
  );
}
