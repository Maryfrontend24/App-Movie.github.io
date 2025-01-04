import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const time = setTimeout(() => {
      console.log('setting');
      setDebounce(value);
    }, delay);

    return () => {
      console.log('clear time');
      clearTimeout(time);
    };
  }, [value, delay]);

  return debounce;
};
export default useDebounce;
