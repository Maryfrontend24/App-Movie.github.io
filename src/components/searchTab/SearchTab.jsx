// eslint-disable-next-line no-unused-vars
import PaginationMovies from '../pagination/PaginationMovies.jsx';
// eslint-disable-next-line no-unused-vars
import SearchPanel from '../search/SearchPanel.jsx';
// eslint-disable-next-line no-unused-vars
import { Spin, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import CardsMovieList from '../cardsList/CardsMovieList.jsx';
import useDebounce from '../../useDebounce.jsx';

const SearchTab = ({
  sessionId,
  page,
  setPage,
  movies,
  setMovies,
  onChange,
  searchValue,
  setSearchValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const apiKey = '42c8d364cfc2f9ab1d8bdafe10e1b95e';

  const getMovieRequest = async (searchValue) => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&api_key=${apiKey}&page=${page}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);

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

  return (
    <div>
      <SearchPanel searchValue={searchValue} setSearchValue={setSearchValue} />
      {loading ? (
        <Spin tip="Loading" size="large" fullscreen={true} />
      ) : (
        <>
          <CardsMovieList
            movies={movies}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            debouncedSearchValue={debouncedSearchValue}
            sessionId={sessionId}
            searchValue={searchValue}
            loading={loading}
            setSearchValue={setSearchValue}
            errorMessage={errorMessage}
          />
          <Layout.Footer>
            {!!searchValue && (
              <PaginationMovies
                total={totalPages}
                current={page}
                onChange={onChange}
                sessionId={sessionId}
              />
            )}
          </Layout.Footer>
        </>
      )}
    </div>
  );
};

export default SearchTab;
