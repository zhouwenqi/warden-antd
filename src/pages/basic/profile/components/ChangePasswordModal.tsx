import { Form, Input, message, Modal } from "antd"
import { useIntl } from "umi";

/**
 * Window - 修改密码
 * @param props 
 * @returns 
 */
const ChangePasswordModal=(props:ChangePasswordModalProps)=>{   
    const intl = useIntl() 
    const [form] = Form.useForm()
    const onSubmitHandler=()=>{
        form.submit()
    }
    const onFinishHandler=()=>{
        message.success(intl.formatMessage({id:'profile.message.password.success'}))
        props.setIsOpen(false)
        form.resetFields()
    }
    return(
        <Modal open={props.isOpen} title={intl.formatMessage({id:'profile.modal.password.title'})} onOk={()=>{onSubmitHandler()}} onCancel={()=>{props.setIsOpen(false)}}>
            <Form form={form} name="passwordform" onFinish={onFinishHandler}>
                <Form.Item label={intl.formatMessage({id:'profile.modal.password.label.original.password'})} name="originalPassword" rules={[{ required: true, message: intl.formatMessage({id:'profile.modal.password.rules.original.password'}) }]}>
                    <Input.Password  placeholder={intl.formatMessage({id:'profile.modal.password.placeholder.password'})} />
                </Form.Item>
                <Form.Item label={intl.formatMessage({id:'profile.modal.password.label.new.password'})} name="newPassword" rules={[{ required: true, message: intl.formatMessage({id:'profile.modal.password.rules.new.password'}) }]}>
                    <Input.Password  placeholder={intl.formatMessage({id:'profile.modal.password.placeholder.password'})} />
                </Form.Item>
                <Form.Item label={intl.formatMessage({id:'profile.modal.password.label.confirm.password'})} name="confirmPassword" rules={[{ required: true, message: intl.formatMessage({id:'profile.modal.password.rules.confirm.password'}) }]}>
                    <Input.Password  placeholder={intl.formatMessage({id:'profile.modal.password.placeholder.password'})} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal