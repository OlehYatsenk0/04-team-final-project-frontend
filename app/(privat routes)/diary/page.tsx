import { Metadata } from 'next';
import { QueryClient } from '@tanstack/react-query';
import { fetchServerDiaries } from '@/lib/api/serverApi';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import DiaryPageClient from './DiaryPage.client';
import { QUERY_KEYS } from '@/app/const/queryKeys';

export const metadata: Metadata = {
  title: 'Щоденник',
  description: 'Проглядайте та редагуйте записи у щоденнику',
};

export default async function DiaryPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.DIARIES],
    queryFn: () => fetchServerDiaries(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryPageClient />
    </HydrationBoundary>
  );
}
