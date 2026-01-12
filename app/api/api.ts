// import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'https://zero4-team-final-project-backend.onrender.com',
//   withCredentials: true,
// });

// ! це треба видалить і залигити закуоментований варіант
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const jar = new CookieJar();
export const api = wrapper(
  axios.create({
    baseURL: 'https://zero4-team-final-project-backend.onrender.com',
    withCredentials: true,
    jar,
  }),
);
