// import { api } from '@/app/api/api';
// import { PregnancyWeek } from '@/types/week';

// export async function fetchWeekServer(
//   weekNumber: number,
// ): Promise<PregnancyWeek> {
//   await api.post('/auth/login', {
//     email: 'testmax@mail.com',
//     password: '12345678',
//   });

//   const { data } = await api.get(`/weeks/${weekNumber}`);
//   return data;
// }

import { api } from '@/app/api/api';
import { PregnancyWeek } from '@/types/week';

export async function fetchWeekServer(
  weekNumber: number,
): Promise<PregnancyWeek> {
  // логін
  const loginRes = await api.post('/auth/login', {
    email: 'testmax@mail.com',
    password: '12345678',
  });

  // якщо бекенд повертає токен
  const token = loginRes.data.token;

  // авторизований запит
  const { data } = await api.get(`/weeks/${weekNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
