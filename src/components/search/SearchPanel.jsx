// eslint-disable-next-line no-unused-vars
import { Input } from 'antd';

const SearchPanel = (props) => {
  const handleChange = (event) => {
    const value = event.target.value;

    const hasVisibleChar = /\S/.test(value);

    if (!hasVisibleChar) {
      props.setSearchValue('');
    } else {
      props.setSearchValue(value);
    }
  };

  return (
    <Input
      type="text"
      name="search"
      placeholder="Movie search..."
      autoFocus
      value={props.searchValue}
      onChange={handleChange}
    />
  );
};

export default SearchPanel;
