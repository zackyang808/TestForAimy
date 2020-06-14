import { Drawer, Form, Button, Input, InputNumber, Select, message } from 'antd';
import { connect, useIntl, FormattedMessage } from 'umi';
import styles from '../index.less';

function DrawerForm(props) {
    const {
        dispatch,
        submitting,
        data,
        visible,
        onClose,
        onFetch,
    } = props;

    const intl = useIntl();
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = values => {
        if (data && data.id)
            dispatch({
                type: 'product/update',
                payload: { ...values, id: data.id }
            }).then(res => {
                if (res.isSucess) {
                    message.success(intl.formatMessage({ id: 'message.action.succeeded' }));
                    onClose();
                    onFetch(null);
                }
                else
                    message.error(intl.formatMessage({ id: 'message.action.faild' }));
            });
        else
            dispatch({
                type: 'product/add',
                payload: values
            }).then(res => {
                if (res.isSucess) {
                    message.success(intl.formatMessage({ id: 'message.action.succeeded' }));
                    onClose();
                    onFetch(null);
                }
                else
                    message.error(intl.formatMessage({ id: 'message.action.faild' }));
            });
    };

    const onVisibleChange = visible => {
        if (visible && data)
            form.setFieldsValue(data);
        else
            form.resetFields();
    }

    return (
        <Drawer
            title={data ?
                intl.formatMessage({ id: 'form.title.edit' }) :
                intl.formatMessage({ id: 'form.title.create' })}
            width={500}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            onClose={onClose}
            afterVisibleChange={onVisibleChange}
            footer={
                <div className={styles.drawerFooter}>
                    <Button onClick={onClose} className={styles.btnCancel}>
                        <FormattedMessage id="form.btn.cancel" />
                    </Button>
                    <Button form="productForm" type="primary" htmlType="submit" loading={submitting}>
                        <FormattedMessage id="form.btn.save" />
                    </Button>
                </div>
            }>
            <Form
                id="productForm"
                {...layout}
                form={form}
                name="productForm"
                onFinish={onFinish}>
                <Form.Item name="name"
                    label={<FormattedMessage id="form.label.name" />}
                    rules={[
                        { required: true, message: intl.formatMessage({ id: 'form.validation.message.required' }) },
                        { type: 'string', max: 100, message: intl.formatMessage({ id: 'form.validation.message.invalid.name' }) }
                    ]}>
                    <Input placeholder={intl.formatMessage({ id: 'form.placeholder.name' })} />
                </Form.Item>
                <Form.Item name="price"
                    label={<FormattedMessage id="form.label.price" />}
                    rules={[
                        { required: true, message: intl.formatMessage({ id: 'form.validation.message.required' }) },
                        { type: 'number', max: 99999.99, min: 0.01, message: intl.formatMessage({ id: 'form.validation.message.invalid.price' }) },
                        { pattern: new RegExp(/^[0-9]*(\.[0-9]{1,2})?$/), message: intl.formatMessage({ id: 'form.validation.message.invalid.price' }) }
                    ]}>
                    <InputNumber placeholder={intl.formatMessage({ id: 'form.placeholder.price' })}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                </Form.Item>
                <Form.Item name="type"
                    label={<FormattedMessage id="form.label.type" />}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.validation.message.required' }) }]}>
                    <Select placeholder={intl.formatMessage({ id: 'form.placeholder.type' })} >
                        <Select.Option value="Hardware">Hardware</Select.Option>
                        <Select.Option value="Software">Software</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="description"
                    label={<FormattedMessage id="form.label.description" />}
                    rules={[{ type: 'string', max: 300, message: intl.formatMessage({ id: 'form.validation.message.invalid.description' }) }]}>
                    <Input.TextArea placeholder={intl.formatMessage({ id: 'form.placeholder.description' })} />
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default connect(({ loading }) => ({
    submitting: loading.effects['product/add'] || loading.effects['product/update']
}))(DrawerForm)
