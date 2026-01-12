import { Week } from '@/types/week';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export async function fetchWeek(): Promise<Week | null> {
  try {
    const { data } = await api.get<Week>('/weeks');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
