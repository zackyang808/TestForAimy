import { useState, useEffect } from 'react'
import { connect, useIntl, FormattedMessage } from 'umi';
import { Card, Table, Space, Button, Popconfirm, message } from 'antd';
import Toolbar from './Toolbar'
import DrawerForm from './DrawerForm';

function TableList(props) {
    const {
        dispatch,
        product = { products: [], total: 0 },
        loading
    } = props;
    const { products, total } = product;

    const intl = useIntl();
    const [fetchParams, setfetchParams] = useState({ current: 1, pageSize: 10 });
    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        fetch(fetchParams);
    }, []);

    const onCreate = () => {
        setDrawer({ visible: true, data: null });
    }

    const onEdit = row => {
        setDrawer({ visible: true, data: row });
    }

    const onDelete = id => {
        dispatch({
            type: 'product/delete',
            payload: { id: id }
        }).then(res => {
            if (res.isSucess) {
                message.success(intl.formatMessage({ id: 'message.action.succeeded' }));
                fetch(fetchParams);
            }
            else {
                message.error(intl.formatMessage({ id: 'message.action.faild' }));
            }
        })
    }

    const onSearch = value => {
        const params = { ...fetchParams, current: 1, search: value, };
        setfetchParams(params);
        fetch(params);
    }

    const onChange = (pagination, filters, sorter) => {
        const { field: orderBy, order: orderDir } = sorter;
        const params = { ...fetchParams, ...pagination, orderBy, orderDir };
        setfetchParams(params);
        fetch(params);
    };

    const onDrawerClose = () => {
        setDrawer({ visible: false, data: null });
    }

    const fetch = (params) => {
        dispatch({
            type: 'product/fetch',
            payload: params || fetchParams
        });
    }

    const columns = [
        {
            title: intl.formatMessage({ id: 'form.label.name' }),
            dataIndex: 'name',
            sorter: true
        },
        {
            title: intl.formatMessage({ id: 'form.label.price' }),
            dataIndex: 'price',
            sorter: true
        },
        {
            title: intl.formatMessage({ id: 'form.label.type' }),
            dataIndex: 'type'
        },
        {
            title: intl.formatMessage({ id: 'form.label.description' }),
            dataIndex: 'description',
            ellipsis: true,
        },
        {
            title: intl.formatMessage({ id: 'list.header.title.action' }),
            dataIndex: 'action',
            render: (_, row) => (
                <Space>
                    <Button onClick={() => onEdit(row)}>
                        <FormattedMessage id="list.col.action.btn.edit" />
                    </Button>
                    <Popconfirm
                        title={intl.formatMessage({ id: 'action.delete.confirm' })}
                        onConfirm={() => onDelete(row.id)}
                        okText={intl.formatMessage({ id: 'action.delete.confirm.btn.ok' })}
                        cancelText={intl.formatMessage({ id: 'action.delete.confirm.btn.cancel' })}>
                        <Button>
                            <FormattedMessage id="list.col.action.btn.delete" />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const { current, pageSize } = fetchParams;

    return (
        <>
            <Toolbar onCreate={onCreate} onSearch={onSearch} />

            <Card>
                <Table size="small"
                    columns={columns}
                    rowKey={row => row.id}
                    dataSource={products}
                    loading={loading}
                    onChange={onChange}
                    pagination={{ current, pageSize, total: total }} />
            </Card>

            <DrawerForm {...drawer} onClose={onDrawerClose} onFetch={fetch} />
        </>
    )
}

export default connect(({ product, loading }) => ({
    ...product,
    loading: loading.effects['product/fetch']
}))(TableList)