import styles from './DashboardPage.module.css';
import { lato } from './fonts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchWeek } from '@/lib/api/api';
import DashboardPageClient from './DashboardPage.client';

async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['week'],
    queryFn: fetchWeek,
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DashboardPageClient />
        </HydrationBoundary>
      </div>
    </main>
  );
}

export default DashboardPage;
