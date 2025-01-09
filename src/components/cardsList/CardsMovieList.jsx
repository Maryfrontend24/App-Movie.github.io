// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Layout, Typography } from 'antd';
// eslint-disable-next-line no-unused-vars
import CardMovie from '../card/CardMovie.jsx';

const CardsMovieList = ({
  movies,
  sessionId,
  loading,
  selectedStarsCount,
  setSelectedStarsCount,
  debouncedSearchValue,
}) => {


  const [showNotFound, setShowNotFound] = useState(false);
  const isSearchPerformed = debouncedSearchValue.length > 0;
  useEffect(() => {
    if (movies.length === 0 && isSearchPerformed && !loading) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 200);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании
    } else {
      setShowNotFound(false);
    }
  }, [isSearchPerformed, movies.length, loading]);

  return (
    <Layout.Content className="grid">
      {showNotFound ? (
        <Typography.Text
          type="danger"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          Упс...Такого фильма еще нет :( Попробуй ввести другое название!
        </Typography.Text>
      ) : (
        movies.map((movie) => (
          <CardMovie
            key={movie.id}
            movieId={movie.id}
            movie={movie}
            sessionId={sessionId}
            selectedStarsCount={selectedStarsCount}
            setSelectedStarsCount={setSelectedStarsCount}
          />
        ))
      )}
    </Layout.Content>
  );
};

export default CardsMovieList;
