// eslint-disable-next-line no-unused-vars
import { Pagination } from 'antd';

const PaginationMovies = ({ onChange, total, current }) => {
  return (
    <Pagination
      hideOnSinglePage={true}
      align="center"
      total={total}
      current={current}
      onChange={onChange}
    />
  );
};

export default PaginationMovies;
