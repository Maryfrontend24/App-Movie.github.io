
import axios from 'axios';

const createSessionId = async () => {
  const urlGuestId =
    'https://api.themoviedb.org/3/authentication/guest_session/new';

  try {
    const response = await axios.get(urlGuestId, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM4ZDM2NGNmYzJmOWFiMWQ4YmRhZmUxMGUxYjk1ZSIsIm5iZiI6MTczMTYxMDkyNC45MTk0ODg0LCJzdWIiOiI2NzM2MzIwNWUwNTgyM2JkOWM3YzU0NDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X0kGNNFjYFO4nJloqT0D2dma_Oc9XP0RBRccOS0CLiY`,
        Accept: 'application/json',
      },
    });

    // Проверка статуса ответа
    if (response.status >= 200 && response.status < 300) {
      const sessionId = response.data.guest_session_id;

      // Сохраняем sessionId в localStorage
      localStorage.setItem('guest_session_id', sessionId);

      console.log('Сессионный ID:', sessionId);
      return sessionId;
    } else {
      console.error('Не удалось создать гостевую сессию:', response.status);
      // throw new Error(`Failed to create guest session: ${response.status}`);
    }
  } catch (error) {
    console.error(
      'Ошибка:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Перенаправляем ошибку дальше
  }
};

export default createSessionId;
