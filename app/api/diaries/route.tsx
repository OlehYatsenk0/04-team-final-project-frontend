import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api as externalApi } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { Diary } from '@/types/diary';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const response = await externalApi.get<Diary[]>('/api/diaries', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.status },
      );
    }
    logErrorResponse({
      message: (error as Error).message,
    });

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}

type CreateDiaryPayload = {
  title: string;
  description: string;
  date: string; // 'YYYY-MM-DD'
  emotions: string[]; // масив _id емоцій
};

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = (await request.json()) as CreateDiaryPayload;

    const response = await externalApi.post<Diary>('/api/diaries', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
