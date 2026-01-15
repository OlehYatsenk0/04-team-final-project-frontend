import styles from './page.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchWeek } from '@/lib/api/api';
import DashboardPageClient from './DashboardPage.client';
import Header from '@/components/Header/Header';

async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['week'],
    queryFn: fetchWeek,
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <DashboardPageClient />
          </HydrationBoundary>
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
