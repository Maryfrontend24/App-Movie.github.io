// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Layout, Tabs } from 'antd';
// eslint-disable-next-line no-unused-vars
import RatedMovieList from './components/rated/RatedMovieList.jsx';
// eslint-disable-next-line no-unused-vars
import SearchTab from './components/searchTab/SearchTab.jsx';
import createSessionId from '../src/services/createGuestIdSession.js';
// eslint-disable-next-line no-unused-vars
import { DataContextProvider } from './providers/DataProvider.jsx';


  const App = () => {
    const [movies, setMovies] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);


      useEffect(() => {    // проверка в хранилище,получение нового sessionId
        const localStorageId = localStorage.getItem('sessionId');
        if (localStorageId) {
          setSessionId(localStorageId);
          console.log(`localStorage id`, localStorageId);
        } else {
          createSessionId()
            .then((newSessionId) => {
              setSessionId(newSessionId);
              localStorage.setItem('sessionId', newSessionId);
              console.log(`new session id`, newSessionId);
            })
            .catch((error) => {
              console.error(`Error: ${error.message}`);
            });
        }
      }, []);

  // useEffect(() => {
  //   console.log('Current sessionId: ', sessionId); // Логируем текущее значение sessionId
  // }, [sessionId]);
  const onChange = (page) => {
    setPage(page);
  };

  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab sessionId={sessionId}
                           page={page}
                           setPage={setPage}
                           movies={movies}
                           setMovies={setMovies}
                           onChange={onChange}
                           searchValue={searchValue}
                           setSearchValue={setSearchValue}
                           />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedMovieList sessionId={sessionId} movies={movies} setMovies={setMovies} />,
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
          page={page}
        />
      </DataContextProvider>
    </Layout>
  );
};

export default App;
