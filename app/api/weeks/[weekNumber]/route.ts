import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';

export async function GET(
  request: NextRequest,
  { params }: { params: { weekNumber: string } },
) {
  try {
    const weekNumber = Number(params.weekNumber);
    const cookieStore = await cookies();

    const res = await api.get(`/weeks/${weekNumber}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
