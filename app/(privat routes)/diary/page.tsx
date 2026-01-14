import { QueryClient } from '@tanstack/react-query';
import { fetchServerDiaries } from '@/lib/api/serverApi';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import DiaryPageClient from './DiaryPage.client';

export default async function DiaryPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diaries'],
    queryFn: () => fetchServerDiaries(),

  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryPageClient />
    </HydrationBoundary>
  );
} 
