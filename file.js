import axios from 'axios';

const getRatedList = async () => {
  const url = `https://api.themoviedb.org/3/guest_session/f4cc3bd06efed6b96b9fb6094fa1903d/rated/movies`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM4ZDM2NGNmYzJmOWFiMWQ4YmRhZmUxMGUxYjk1ZSIsIm5iZiI6MTczMTYxMDkyNC45MTk0ODg0LCJzdWIiOiI2NzM2MzIwNWUwNTgyM2JkOWM3YzU0NDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X0kGNNFjYFO4nJloqT0D2dma_Oc9XP0RBRccOS0CLiY`,
      Accept: 'application/json',
    },
    params: {
      language: 'en-US',
      page: '1',
      sort_by: 'created_at.asc',
    },
  });

  if (res.status >= 200 && res.status < 300) {
    const films = res.data.results;

    console.log('фильмы', films);
    return films;
  }
};
getRatedList();
