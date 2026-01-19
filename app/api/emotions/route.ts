import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api as externalApi } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';
import type { Emotion } from '@/types/diary';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const response = await externalApi.get<Emotion[]>('/api/emotions', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json([], { status: error.status ?? 500 });
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json([], { status: 500 });
  }
}
