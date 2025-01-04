// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Layout, Tabs } from 'antd';
// eslint-disable-next-line no-unused-vars
import RatedMovieList from './components/rated/RatedMovieList.jsx';
// eslint-disable-next-line no-unused-vars
import SearchTab from './components/searchTab/SearchTab.jsx';
import createSessionId from './components/cardsList/createGuestIdSession.js';
// eslint-disable-next-line no-unused-vars
import { DataContextProvider } from './providers/DataProvider.jsx';
import useDebounce from './useDebounce.jsx';

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionId, setSessionId] = useState(null);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const apiKey = '42c8d364cfc2f9ab1d8bdafe10e1b95e';

  useEffect(() => {
    createSessionId()
      .then((newSessionId) => {
        setSessionId(newSessionId);
        console.log(newSessionId);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    console.log('Current sessionId: ', sessionId); // Логируем текущее значение sessionId
  }, [sessionId]);

  const getMovieRequest = async (searchValue) => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&api_key=${apiKey}&page=${page}`;

    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        setMovies(responseJson.results);
        setTotalPages(responseJson['total_pages']);
        if (responseJson['total_pages'] < page) {
          setPage(1);
        }
      } else {
        // Если возврат не содержит результатов
        setErrorMessage('Movies not found :(');
      }
    } catch (errorMessage) {
      console.error('Error:', errorMessage);
      setErrorMessage('Error! Please try again later :(');
    } finally {
      setLoading(false); // Устанавливаем загрузку в false в любом случае
    }
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      getMovieRequest(debouncedSearchValue);
    } else {
      setMovies([]); // Очищаем фильмы при пустом поисковом запросе
      setTotalPages(0); // Сбрасываем общее количество страниц
    }
  }, [debouncedSearchValue, page]);

  const onChange = (page) => {
    setPage(page);
  };

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <SearchTab
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          debouncedSearchValue={debouncedSearchValue}
          loading={loading}
          movies={movies}
          errorMessage={errorMessage}
          totalPages={totalPages}
          page={page}
          sessionId={sessionId}
          onChange={onChange}
          apiKey={apiKey}
        />
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedMovieList movies={movies} sessionId={sessionId} />,
    },
  ];

  return (
    <Layout>
      <DataContextProvider>
        <Tabs
          destroyInactiveTabPane
          defaultActiveKey="1"
          items={items}
          centered
          onChange={onChange}
        />
      </DataContextProvider>
    </Layout>
  );
};

export default App;
