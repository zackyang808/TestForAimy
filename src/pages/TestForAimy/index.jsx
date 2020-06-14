import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TableList from './components/TableList'
import styles from './index.less';

export default function() {
  return (
    <PageHeaderWrapper className={styles.main}>
      <TableList />
    </PageHeaderWrapper>
  );
};
