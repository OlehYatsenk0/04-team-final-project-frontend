import { PregnancyWeek } from '@/types/week';
import { api } from './api';
import { api as externalApi } from '@/app/api/api';
import { cookies } from 'next/headers';
import { Diary } from '@/types/diary';
import { ApiResponse } from '@/types/axios';

export async function fetchDataByWeekNumber(
  weekNumber: number,
): Promise<PregnancyWeek> {
  // noteId: string,
  // cookie: string,
  const { data } = await api.get(`/weeks`, {
    params: { week: weekNumber },
    withCredentials: true,
  });

  return data;
}

export const fetchServerDiaries = async () => {
  const cookieStore = await cookies();
  const {data} = await externalApi.get<ApiResponse<Diary[]>>('/api/diaries', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.data;
};

export const fetchServerDiaryById = async (id: string) => {
  const cookieStore = await cookies();
  const {data} = await externalApi.get<ApiResponse<Diary>>(`/api/diaries/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.data;
};