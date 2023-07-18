import styles from './LoginCardFrame.less';
import AppIcon from '@/components/AppIcon';
import { Alert, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  useIntl
} from 'umi';
import AppSwiper from '@/components/AppSwpier';

/**
 * 登录页 - 卡片布局
 * @returns
 */
export default function LoginCardFrame(props:FrameProps) {
  const intl = useIntl()
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    const data = {
      uid:values.uid,
      pwd:values.password
    }
    props.onLogin(data)
  }

  const swiperData = [
    {
      id: 1,
      source: '/images/card1.jpg',
    },
    {
      id: 1,
      source: '/images/card2.jpg',
    },
    {
      id: 3,
      source: '/images/card3.jpg',
    },
    {
      id: 4,
      source: '/images/card4.jpg',
    }
  ]

  /**
   * 轮播图点击事件
   * @param item 
   */
  const onClickSwiperItemHandler=(item:IswiperItemData)=>{
    console.log(item)
  }

  return (
    <div className={styles.frameBody}>
      <div className={styles.loginLogoBox}>
        <AppIcon name="logo" className={styles.svgLogo} />
        <h2>{intl.formatMessage({ id: 'app.title' })}</h2>
        <h3>{intl.formatMessage({ id: 'login.welcome.title' })}</h3>
      </div>
      <div className={styles.cardFrame}>
        <div className={styles.cardLeft}>
          <AppSwiper onClick={onClickSwiperItemHandler} data={swiperData} />
        </div>
        <div className={styles.cardRight}>
          <div className={styles.loginFormBox}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="uid"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'login.check.uid.empty',
                    }),
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={intl.formatMessage({ id: 'login.input.uid' })}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'login.check.pwd.empty',
                    }),
                  },
                ]}
              >
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
                <a onClick={()=>{props.onForegot!()}}>{intl.formatMessage({ id: 'login.forgot.pwd' })}</a>
              </div>
              <Form.Item name="loginbtn" style={{ marginBottom: '0px' }}>
                <Button
                  className={styles.loginBtn}
                  type="primary"
                  htmlType="submit"
                  loading={props.logingStatus}
                  block
                >
                  {intl.formatMessage({ id: 'login.button.submit' })}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className={styles.copyrightBox}>
        {intl.formatMessage({ id: 'app.copyright.info' })}
      </div>
    </div>
  );
}
