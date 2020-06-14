import { Card, Row, Col, Button, Input } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Toolbar.less'

export default function (props) {
    const {
        onCreate,
        onSearch
    } = props;

    const intl = useIntl();

    return (
        <Card bordered={false}>
            <Row>
                <Col span={12}>
                    <Button type="primary" ghost onClick={onCreate}>
                        <FormattedMessage id="toolbar.btn.create" />
                    </Button>
                </Col>
                <Col span={12} className={styles.searchCol}>
                    <Input.Search
                        placeholder={intl.formatMessage({ id: 'toolbar.search.placeholder' })}
                        onSearch={onSearch}
                        className={styles.searchInput}
                    />
                </Col>
            </Row>
        </Card>
    )
}
