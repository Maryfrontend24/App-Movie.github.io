// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { Layout, Card, Spin, Alert, Typography } from 'antd';
// eslint-disable-next-line no-unused-vars
import CardMovie from '../card/CardMovie.jsx';

const RatedMovieList = ({ sessionId, page }) => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getRatedList = async () => {
    const url = `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=42c8d364cfc2f9ab1d8bdafe10e1b95e`;

    try {
      const res = await axios.get(url, {
        headers: {
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM4ZDM2NGNmYzJmOWFiMWQ4YmRhZmUxMGUxYjk1ZSIsIm5iZiI6MTczMTYxMDkyNC45MTk0ODg0LCJzdWIiOiI2NzM2MzIwNWUwNTgyM2JkOWM3YzU0NDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X0kGNNFjYFO4nJloqT0D2dma_Oc9XP0RBRccOS0CLiY`,
          Accept: 'application/json',
        },
        params: {
          language: 'en-US',
          page: page,
          // sort_by: 'created_at.asc',
        },
      });
      console.log(res.data);

      if (res.status >= 200 && res.status < 300) {
        const films = res.data.results || [];
        setRatedMovies(films);
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка при загрузке фильмов');
    } finally {
      setLoading(false); // Устанавливаем загрузку в false после завершения
    }
  };

  useEffect(() => {
    console.log('Fetching movies for sessionId:', sessionId, 'page:', page);
    if (sessionId) {
      getRatedList();
    }
  }, [sessionId, page]); // Выполняем запрос при изменении sessionId или page

  // Обработка состояния загрузки
  if (loading) {
    return (
      <Layout.Content className="grid">
        <div style={{ minHeight: '100vh' }}>
          <Spin
            tip="Загрузка фильмов..."
            spinning={true}
            fullscreen={true}
            size="large"
          />
        </div>
      </Layout.Content>
    );
  }

  // Обработка ошибок
  // if (error) {
  //   return (
  //     <Layout.Content className="grid">
  //       <Alert
  //         message="Произошла ошибка"
  //         description={error.message}
  //         type="error"
  //       />
  //     </Layout.Content>
  //   );
  // }

  // Отображение списка фильмов
  return (
    <Layout.Content className="grid">
      {ratedMovies.length > 0 ? (
        ratedMovies.map((movie) => (
          <CardMovie
            key={movie.id}
            movieId={movie.id}
            sessionId={sessionId}
            ratedMovies={ratedMovies}
            movie={movie}
            error={error}
            setRatedMovies={setRatedMovies}
          />
        ))
      ) : (
        <Typography.Text
          type="danger"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          Упс...Ты был занят и еще не оценивал фильмы:(
        </Typography.Text>
      )}
    </Layout.Content>
  );
};

export default RatedMovieList;
