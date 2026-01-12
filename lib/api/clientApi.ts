import { PregnancyWeek } from '@/types/week';
import { api } from './api';

export async function fetchWeekClient(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const { data } = await api.get(`/weeks/${weekNumber}`, {
    withCredentials: true,
  });
  return data;
}
