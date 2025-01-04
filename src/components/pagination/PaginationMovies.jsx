// eslint-disable-next-line no-unused-vars
import { Pagination } from 'antd';

const PaginationMovies = (props) => {
  return (
    <Pagination
      hideOnSinglePage={true}
      align="center"
      total={props.total}
      onChange={props.onChange}
      current={props.current}
    />
  );
};

export default PaginationMovies;
