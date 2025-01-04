// eslint-disable-next-line no-unused-vars
import PaginationMovies from '../pagination/PaginationMovies.jsx';
// eslint-disable-next-line no-unused-vars
import SearchPanel from '../search/SearchPanel.jsx';
// eslint-disable-next-line no-unused-vars
import { Spin, Layout } from 'antd';
import { useContext, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import CardsMovieList from '../cardsList/CardsMovieList.jsx';
import { DataContext } from '../../context/DataContext.jsx';

const SearchTab = ({
  searchValue,
  setSearchValue,
  loading,
  movies,
  errorMessage,
  totalPages,
  debouncedSearchValue,
  page,
  onChange,
  sessionId,
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const { genres } = useContext(DataContext);

  return (
    <div>
      <SearchPanel searchValue={searchValue} setSearchValue={setSearchValue} />
      {loading ? (
        <Spin tip="Loading" size="large" fullscreen={true} />
      ) : (
        <>
          <CardsMovieList
            movies={movies}
            debouncedSearchValue={debouncedSearchValue}
            sessionId={sessionId}
            setSelectedRating={setSelectedRating}
            searchValue={searchValue}
            loading={loading}
            setSearchValue={setSearchValue}
            errorMessage={errorMessage}
            selectedRating={selectedRating}
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
