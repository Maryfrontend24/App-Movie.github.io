import React, { useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { DataContext } from '../context/DataContext.jsx';

export const DataContextProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  function getGenres() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM4ZDM2NGNmYzJmOWFiMWQ4YmRhZmUxMGUxYjk1ZSIsIm5iZiI6MTczMTYxMDkyNC45MTk0ODg0LCJzdWIiOiI2NzM2MzIwNWUwNTgyM2JkOWM3YzU0NDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X0kGNNFjYFO4nJloqT0D2dma_Oc9XP0RBRccOS0CLiY`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data.genres;
          // console.log(data);
          setGenres(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getGenres();
  }, []);

  return <DataContext.Provider value={genres}>{children}</DataContext.Provider>;
};
