// eslint-disable-next-line no-unused-vars
import { Input } from 'antd';

const SearchPanel = (props) => {
  const handleChange = (event) => {
    const value = event.target.value;

    // Регулярное выражение, которое проверяет, есть ли хотя бы один видимый символ
    const hasVisibleChar = /\S/.test(value);

    if (!hasVisibleChar) {
      // Если строка не содержит видимых символов, очищаем поле
      props.setSearchValue('');
    } else {
      // В противном случае обновляем значение
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
