import {
  // eslint-disable-next-line no-unused-vars
  Tag,
  // eslint-disable-next-line no-unused-vars
  Rate,
  // eslint-disable-next-line no-unused-vars
  Card,
  // eslint-disable-next-line no-unused-vars
  Col,
  // eslint-disable-next-line no-unused-vars
  Flex,
  // eslint-disable-next-line no-unused-vars
  Row,
} from 'antd';

import { parseISO, format } from 'date-fns';

// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';

import axios from 'axios';
import { DataContext } from '../../context/DataContext.jsx';

function cutTextInCard(overview, maxLength) {
  if (overview.length <= maxLength) {
    return overview;
  }
  let cutText = overview.substring(0, maxLength);
  const lastTextIndex = cutText.lastIndexOf(' ');
  if (lastTextIndex !== -1) {
    cutText = cutText.substring(0, lastTextIndex);
  }
  return cutText + '...';
}

const CardMovie = ({ movie, sessionId, movieId }) => {
  const {
    title,
    poster_path,
    vote_average,
    release_date,
    genre_ids,
    overview,
  } = movie;

  const genres = useContext(DataContext);

  const names = genre_ids.map((id) => {
    const foundGenre = genres.find((genre) => genre.id === id);

    return foundGenre ? foundGenre.name : null;
  });

  const validNames = names.filter((name) => name !== null);

  const [selectedStarsCount, setSelectedStarsCount] = useState(
    vote_average || 0,
  );
  const formattedVoteAverage =
    vote_average === 0 || vote_average === 10
      ? selectedStarsCount === 0
        ? '0' // если selectedStarsCount === 0, показываем "0"
        : selectedStarsCount.toFixed(0)
      : selectedStarsCount.toFixed(1);

  const getColorAverage = (formattedVoteAverage) => {
    if (formattedVoteAverage < 3) {
      return '#E90000';
    } else if (formattedVoteAverage >= 3 && formattedVoteAverage < 5) {
      return '#E97E00';
    } else if (formattedVoteAverage >= 5 && formattedVoteAverage < 7) {
      return '#E9D100';
    } else {
      return '#66E900';
    }
  };

  const borderColor = getColorAverage(formattedVoteAverage);

  const maxLength = 115;
  const stringTime = release_date;
  let resultFormatTime;
  if (stringTime) {
    resultFormatTime = format(parseISO(stringTime), 'MMMM d, y');
  }

  const baseUrl = `https://image.tmdb.org/t/p/original`;

  const handleRateChange = async (value) => {
    setSelectedStarsCount(value);

    if (!sessionId) {
      console.error('Session ID is undefined. Please create a new session.');
      alert(
        'Ошибка: не удалось получить сеанс гостя. Пожалуйста, попробуйте снова.',
      );
      return;
    }

    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}&api_key=42c8d364cfc2f9ab1d8bdafe10e1b95e`;

    try {
      const headers = {
        'Content-Type': 'application/json;charset=utf-8',
      };
      console.log(`headers: ${JSON.stringify(headers)}`);
      console.log(`value: ${value}`);
      console.log(`url: ${url}`);

      // Выполняем POST-запрос
      const response = await axios.post(
        url,
        {
          value: value,
        },
        {
          headers: headers,
        },
      );

      if (response.status >= 200 && response.status < 300) {
        alert('Оценка успешно добавлена!');

        // Обновляем локальное состояние только если новое значение рейтинга отличается
        if (selectedStarsCount !== value) {
          setSelectedStarsCount(value);
        }
      } else {
        console.error('Ошибка при добавлении оценки:', response.status);
        alert('Произошла ошибка при добавлении оценки.');
      }
    } catch (error) {
      console.error('Ошибка при добавлении оценки:', error);
      alert('Произошла ошибка при добавлении оценки.');
    }
  };

  return (
    <Row>
      <Col span={12}>
        <Card
          bordered={false}
          className="movieItem"
          hoverable
          styles={{
            body: { padding: 0, overflow: 'auto' },
          }}
        >
          <Flex justify="space-between" className="description">
            <img
              width="183"
              src={
                poster_path
                  ? baseUrl + poster_path
                  : 'https://img.freepik.com/free-photo/3d-rendering-popcorn-snack-movies_23-2151169453.jpg'
              }
              alt={title}
            />
            <div className="movieInfo">
              <Row justify="space-between" align="center">
                <h3
                  style={{
                    width: '180px',
                    fontSize: '16px',
                    marginBottom: '7px',
                    fontWeight: '400',
                    lineHeight: '20px',
                  }}
                >
                  {title}
                </h3>
                <div
                  className="voteAverageBorder"
                  style={{
                    border: `2px solid ${borderColor}`,
                  }}
                >
                  {formattedVoteAverage}
                </div>
              </Row>
              <div className="column">
                <p style={{ marginTop: 0, marginBottom: '7px' }}>
                  {resultFormatTime}
                </p>
                <Flex gap="2px" wrap style={{ marginBottom: '8px' }}>
                  {validNames.map((validName) => {
                    return (
                      <Tag key={validName} className="genreMovie">
                        {validName}
                      </Tag>
                    );
                  })}
                </Flex>
                <div className="movieText" style={{ fontSize: '12px' }}>
                  {cutTextInCard(overview, maxLength)}
                </div>
                <Rate
                  movieId={movieId}
                  count={10}
                  value={selectedStarsCount}
                  allowHalf
                  onChange={handleRateChange}
                />
              </div>
            </div>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default CardMovie;
